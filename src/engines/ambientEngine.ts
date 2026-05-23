import type { AtmosphereState, TimeOfDay } from '@/types/growth.types'
import { timeOfDayFromElevation } from '@/types/growth.types'

/* ==========================================================================
   Ambient Engine — Continuous Sky System
   Replaces the 5-bucket TimeOfDay approach with minute-accurate math.

   Sun arc:  7am–7pm (configurable). Semicircular left→zenith→right.
   Moon arc: 7pm–7am. Opposite direction, semicircular.
   Sky colours: 12 keyframes interpolated by minute-of-day.
   Lunar phase: real cycle from known reference new moon.
   ========================================================================== */

/* ─── Colour types ──────────────────────────────────────────────────────── */

export interface SceneColors {
  skyTop: string
  skyBottom: string
  groundColor: string
  waterColor: string
  groundFar: string
}

/* ─── Sky colour keyframes ───────────────────────────────────────────────── */

interface SkyKeyframe {
  minute: number // minute of day (0–1439)
  skyTop: [number, number, number] // RGB
  skyBottom: [number, number, number]
  groundColor: [number, number, number]
  waterColor: [number, number, number]
  groundFar: [number, number, number]
}

/** 12 keyframes across 24h. Minute 0 = midnight. */
const SKY_KEYFRAMES: SkyKeyframe[] = [
  {
    minute: 0,
    skyTop: [2, 4, 8],
    skyBottom: [5, 8, 16],
    groundColor: [16, 8, 5],
    waterColor: [8, 16, 24],
    groundFar: [12, 10, 6],
  }, // midnight
  {
    minute: 300,
    skyTop: [13, 8, 32],
    skyBottom: [58, 26, 24],
    groundColor: [90, 48, 32],
    waterColor: [26, 42, 48],
    groundFar: [72, 42, 28],
  }, // 5am pre-dawn
  {
    minute: 360,
    skyTop: [26, 15, 46],
    skyBottom: [200, 104, 48],
    groundColor: [136, 72, 48],
    waterColor: [42, 74, 90],
    groundFar: [112, 66, 44],
  }, // 6am dawn
  {
    minute: 420,
    skyTop: [42, 24, 48],
    skyBottom: [232, 136, 64],
    groundColor: [184, 120, 64],
    waterColor: [42, 96, 112],
    groundFar: [160, 108, 56],
  }, // 7am sunrise
  {
    minute: 480,
    skyTop: [58, 112, 176],
    skyBottom: [192, 216, 240],
    groundColor: [200, 160, 96],
    waterColor: [42, 107, 124],
    groundFar: [184, 148, 88],
  }, // 8am
  {
    minute: 600,
    skyTop: [40, 104, 160],
    skyBottom: [144, 200, 232],
    groundColor: [212, 169, 106],
    waterColor: [38, 96, 124],
    groundFar: [196, 154, 90],
  }, // 10am
  {
    minute: 780,
    skyTop: [26, 80, 144],
    skyBottom: [120, 184, 232],
    groundColor: [192, 144, 80],
    waterColor: [32, 96, 112],
    groundFar: [180, 136, 80],
  }, // 1pm solar noon
  {
    minute: 900,
    skyTop: [32, 96, 168],
    skyBottom: [136, 192, 232],
    groundColor: [200, 152, 88],
    waterColor: [36, 104, 120],
    groundFar: [188, 144, 86],
  }, // 3pm
  {
    minute: 1020,
    skyTop: [26, 64, 128],
    skyBottom: [208, 128, 64],
    groundColor: [160, 112, 56],
    waterColor: [30, 88, 112],
    groundFar: [148, 104, 52],
  }, // 5pm
  {
    minute: 1080,
    skyTop: [24, 48, 96],
    skyBottom: [220, 100, 48],
    groundColor: [136, 88, 52],
    waterColor: [28, 72, 90],
    groundFar: [128, 96, 56],
  }, // 6pm
  {
    minute: 1140,
    skyTop: [20, 12, 40],
    skyBottom: [200, 74, 48],
    groundColor: [122, 78, 48],
    waterColor: [26, 61, 74],
    groundFar: [138, 94, 56],
  }, // 7pm sunset
  {
    minute: 1200,
    skyTop: [8, 8, 24],
    skyBottom: [24, 16, 40],
    groundColor: [58, 32, 24],
    waterColor: [14, 32, 48],
    groundFar: [48, 32, 24],
  }, // 8pm
  {
    minute: 1320,
    skyTop: [4, 6, 16],
    skyBottom: [8, 12, 24],
    groundColor: [24, 14, 8],
    waterColor: [10, 24, 36],
    groundFar: [20, 14, 8],
  }, // 10pm
  {
    minute: 1439,
    skyTop: [2, 4, 8],
    skyBottom: [5, 8, 16],
    groundColor: [16, 8, 5],
    waterColor: [8, 16, 24],
    groundFar: [12, 10, 6],
  }, // 11:59pm → same as midnight
]

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function lerpRgb(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

function toHex(rgb: [number, number, number]): string {
  return (
    '#' +
    rgb
      .map((v) =>
        Math.round(Math.max(0, Math.min(255, v)))
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  )
}

export function interpolateSkyColors(minuteOfDay: number): SceneColors {
  const frames = SKY_KEYFRAMES
  // Find the two bracketing keyframes
  let lo = frames[0]
  let hi = frames[frames.length - 1]
  for (let i = 0; i < frames.length - 1; i++) {
    if (minuteOfDay >= frames[i].minute && minuteOfDay < frames[i + 1].minute) {
      lo = frames[i]
      hi = frames[i + 1]
      break
    }
  }
  const t = hi.minute === lo.minute ? 0 : (minuteOfDay - lo.minute) / (hi.minute - lo.minute)

  return {
    skyTop: toHex(lerpRgb(lo.skyTop, hi.skyTop, t)),
    skyBottom: toHex(lerpRgb(lo.skyBottom, hi.skyBottom, t)),
    groundColor: toHex(lerpRgb(lo.groundColor, hi.groundColor, t)),
    waterColor: toHex(lerpRgb(lo.waterColor, hi.waterColor, t)),
    groundFar: toHex(lerpRgb(lo.groundFar, hi.groundFar, t)),
  }
}

/* ─── Backward-compat: 5-bucket scene colors (for GroundLayer/WaterLayer) ─ */

export const SCENE_COLORS: Record<TimeOfDay, SceneColors> = {
  dawn: {
    skyTop: '#1a0f2e',
    skyBottom: '#e8845a',
    groundColor: '#b8784a',
    waterColor: '#3d6e7e',
    groundFar: '#c4956a',
  },
  morning: {
    skyTop: '#4a88c5',
    skyBottom: '#b8d4f0',
    groundColor: '#d4a96a',
    waterColor: '#2a6b7c',
    groundFar: '#c89a5a',
  },
  afternoon: {
    skyTop: '#2868a0',
    skyBottom: '#d4885a',
    groundColor: '#c08050',
    waterColor: '#1e5a6b',
    groundFar: '#b87040',
  },
  dusk: {
    skyTop: '#140c28',
    skyBottom: '#b84a35',
    groundColor: '#7a4e30',
    waterColor: '#1a3d4a',
    groundFar: '#8a5e38',
  },
  night: {
    skyTop: '#050a14',
    skyBottom: '#0d1b2a',
    groundColor: '#180e05',
    waterColor: '#0a2230',
    groundFar: '#1a1008',
  },
}

/* ─── Solar geometry ────────────────────────────────────────────────────── */

/**
 * Solar elevation in [-1, 1].
 * 0 = horizon, 1 = zenith, negative = below horizon (night).
 */
export function computeSolarElevation(
  minuteOfDay: number,
  sunriseMinute: number,
  sunsetMinute: number,
): number {
  const dayDuration = sunsetMinute - sunriseMinute
  if (dayDuration <= 0) return -1
  const t = (minuteOfDay - sunriseMinute) / dayDuration // 0 at sunrise, 1 at sunset
  if (t < 0 || t > 1) return -Math.abs(Math.sin((t < 0 ? t : t - 1) * Math.PI * 0.5)) * 0.5 - 0.01
  return Math.sin(t * Math.PI) // 0→1→0 over the day
}

/**
 * Sun position as percentages of viewport.
 * Returns null when sun is below horizon (elevation < -0.02).
 * Includes a 15-min fade buffer at horizon.
 */
export function computeSunPosition(
  minuteOfDay: number,
  sunriseMinute: number,
  sunsetMinute: number,
): { x: number; y: number } | null {
  const dayDuration = sunsetMinute - sunriseMinute
  const t = (minuteOfDay - sunriseMinute) / dayDuration
  // Return position even slightly before/after horizon for smooth fade
  if (t < -0.02 || t > 1.02) return null
  const x = 5 + t * 90 // 5% → 95%
  const y = 87 - 77 * Math.sin(Math.max(0, Math.min(1, t)) * Math.PI) // arc
  return { x, y }
}

/**
 * Moon position. Moon traces the opposite arc: right→zenith→left during night.
 * Night: sunset → midnight → sunrise.
 */
export function computeMoonPosition(
  minuteOfDay: number,
  sunriseMinute: number,
  sunsetMinute: number,
): { x: number; y: number } | null {
  const nightDuration = 1440 - (sunsetMinute - sunriseMinute)

  // Normalise minute into night-relative minutes (0 at sunset)
  let nightMinute: number
  if (minuteOfDay >= sunsetMinute) {
    nightMinute = minuteOfDay - sunsetMinute
  } else if (minuteOfDay < sunriseMinute) {
    nightMinute = minuteOfDay + (1440 - sunsetMinute)
  } else {
    return null // daytime
  }

  const t = nightMinute / nightDuration // 0 at sunset, 1 at sunrise
  // Buffer: show moon 15 min before sunset / after sunrise for smooth fade
  if (t < -0.015 || t > 1.015) return null

  const x = 95 - Math.max(0, Math.min(1, t)) * 90 // 95% → 5%
  const y = 87 - 77 * Math.sin(Math.max(0, Math.min(1, t)) * Math.PI)
  return { x, y }
}

/* ─── Stars ──────────────────────────────────────────────────────────────── */

/** Star opacity: fade out as sun rises above horizon. Fully visible at night. */
export function computeStarsOpacity(solarElevation: number): number {
  // 100% when elevation <= 0, fade to 0% at elevation = 0.15
  return Math.max(0, Math.min(1, 1 - solarElevation / 0.15))
}

/* ─── Lunar phase ────────────────────────────────────────────────────────── */

/** Known new moon: 2000-01-06 18:14 UTC */
const KNOWN_NEW_MOON_MS = 947182440000
const LUNAR_CYCLE_MS = 29.530588853 * 24 * 60 * 60 * 1000

/**
 * Returns the current lunar phase [0, 1).
 * 0 = new moon, 0.25 = first quarter, 0.5 = full moon, 0.75 = last quarter.
 */
export function getLunarPhase(date: Date): number {
  const elapsed = date.getTime() - KNOWN_NEW_MOON_MS
  return (((elapsed % LUNAR_CYCLE_MS) + LUNAR_CYCLE_MS) % LUNAR_CYCLE_MS) / LUNAR_CYCLE_MS
}

/* ─── Sun visual properties ──────────────────────────────────────────────── */

export interface SunProps {
  size: number
  discColor: string
  glowColor: string
  glowRadius: number
}

/** Returns sun visual properties based on elevation. */
export function getSunProps(elevation: number): SunProps {
  const e = Math.max(0, Math.min(1, elevation))
  // Lerp from horizon (large, orange) to zenith (small, white-yellow)
  const size = lerp(62, 46, e)
  const r = Math.round(lerp(255, 248, e))
  const g = Math.round(lerp(120, 220, e))
  const b = Math.round(lerp(40, 160, e))
  const discColor = `rgb(${r},${g},${b})`
  const glowR = Math.round(lerp(255, 245, e))
  const glowG = Math.round(lerp(100, 200, e))
  const glowB = Math.round(lerp(30, 64, e))
  const glowOpacity = lerp(0.55, 0.28, e)
  const glowColor = `rgba(${glowR},${glowG},${glowB},${glowOpacity.toFixed(2)})`
  const glowRadius = lerp(80, 28, e)
  return { size, discColor, glowColor, glowRadius }
}

/* ─── Brightness overlay ─────────────────────────────────────────────────── */

/** White sky overlay opacity for midday brightness effect. */
export function getSkyBrightnessOverlay(solarElevation: number): number {
  return Math.max(0, solarElevation * 0.13)
}

/* ─── Main atmosphere computation ────────────────────────────────────────── */

export function computeAtmosphere(
  hour: number,
  minute: number,
  sunriseHour: number,
  sunsetHour: number,
  sessionActive: boolean,
  sessionProgress: number,
  isBreak: boolean,
): AtmosphereState {
  const minuteOfDay = hour * 60 + minute
  const sunriseMinute = sunriseHour * 60
  const sunsetMinute = sunsetHour * 60

  const solarElevation = computeSolarElevation(minuteOfDay, sunriseMinute, sunsetMinute)
  const sunPosition = computeSunPosition(minuteOfDay, sunriseMinute, sunsetMinute)
  const moonPosition = computeMoonPosition(minuteOfDay, sunriseMinute, sunsetMinute)
  const starsOpacity = computeStarsOpacity(solarElevation)
  const skyColors = interpolateSkyColors(minuteOfDay)
  const lunarPhase = getLunarPhase(new Date())
  const timeOfDay = timeOfDayFromElevation(solarElevation, minuteOfDay)

  return {
    timeOfDay,
    solarElevation,
    sunPosition,
    moonPosition,
    starsOpacity,
    lunarPhase,
    skyColors,
    sessionActive,
    sessionProgress,
    isBreak,
  }
}
