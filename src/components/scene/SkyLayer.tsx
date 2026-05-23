import { motion } from 'framer-motion'
import type { AtmosphereState } from '@/types/growth.types'
import { getSunProps, getSkyBrightnessOverlay } from '@/engines/ambientEngine'
import { useDevStore } from '@/stores/devStore'

/* ==========================================================================
   SkyLayer — Continuous Sky System
   All positions and colours are driven by minute-accurate atmosphere state.
   Smooth CSS transitions make changes imperceptible moment-to-moment.
   ========================================================================== */

interface SkyLayerProps {
  atmosphere: AtmosphereState
}

/* ─── Stars (seeded, deterministic) ──────────────────────────────────────── */

// Use a pseudo-random hash to prevent vertical column patterns
const STARS = Array.from({ length: 65 }, (_, i) => {
  // Pseudo-random values between 0 and 1
  const randX = Math.abs(Math.sin(i * 12.9898 + 78.233))
  const randY = Math.abs(Math.sin(i * 78.233 + 12.9898))
  const randSize = Math.abs(Math.sin(i * 45.123))
  const randOpacity = Math.abs(Math.sin(i * 67.891))
  const randTwinkle = Math.abs(Math.sin(i * 89.123))

  return {
    id: i,
    x: randX * 100, // 0 to 100%
    y: randY * 65, // 0 to 65% (top part of sky)
    size: randSize > 0.8 ? 2.5 : randSize > 0.5 ? 2 : 1,
    baseOpacity: 0.25 + randOpacity * 0.4,
    twinkleDuration: 2 + randTwinkle * 2.5,
    twinkleDelay: randTwinkle * 2,
  }
})

/* ─── Sun component (SVG — cross-browser, no border-radius artifact) ──────────
 *
 *  Root cause of the Firefox black border:
 *  `border-radius: 50%` + `background: radial-gradient()` on a <div> uses CSS
 *  geometry clipping, whose sub-pixel anti-aliasing renders a 1px dark fringe
 *  in Firefox (and sometimes Chrome). This is a known browser rendering quirk.
 *
 *  Fix: use an SVG <circle> with fill="url(#gradient)". SVG handles the
 *  circular boundary internally with no clipping artifacts — works identically
 *  across Firefox, Chrome, Edge, and Safari.
 * ─────────────────────────────────────────────────────────────────────────── */

interface SunDiscProps {
  elevation: number // 0 (horizon) → 1 (zenith)
  size: number // px diameter of sun disc
  discColor: string // edge colour (warm at horizon, golden at zenith)
  glowColor: string // glow rgba string
  glowRadius: number // px radius of outer glow
}

function SunDisc({ elevation, size, discColor, glowColor, glowRadius }: SunDiscProps) {
  const e = Math.max(0, Math.min(1, elevation))

  // Disc radius
  const R = size / 2

  // Total SVG canvas includes glow on all sides
  const pad = glowRadius * 1.6
  const total = size + pad * 2
  const cx = total / 2
  const cy = total / 2

  // Gradient stops — colour temperature follows solar elevation
  // Near horizon: orange-red core; zenith: pure white core
  const stopCenter = e > 0.5 ? '#ffffff' : e > 0.2 ? '#fff8e0' : '#fff0c0'
  const stopMid = e > 0.5 ? '#fff5b0' : e > 0.2 ? '#ffc84a' : '#ffaa28'
  const stopEdge = discColor // comes from getSunProps — already elevation-aware

  // Glow: parse the rgba string to build layered SVG fills
  // Two-layer glow: inner tight halo + outer diffuse atmosphere
  const innerGlowR = glowRadius * 0.55
  const outerGlowR = glowRadius * 1.1

  // Atmospheric scattering band at horizon (warm orange smear below sun)
  const showScatter = e < 0.25
  const scatterOpacity = ((0.25 - e) / 0.25) * 0.5

  return (
    <svg
      width={total}
      height={total}
      viewBox={`0 0 ${total} ${total}`}
      style={{
        position: 'absolute',
        marginLeft: `-${cx}px`,
        marginTop: `-${cy}px`,
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* Sun disc — proper radial gradient, no clipping */}
        <radialGradient id="oasis-sun-disc" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor={stopCenter} />
          <stop offset="15%" stopColor={stopCenter} />
          <stop offset="55%" stopColor={stopMid} />
          <stop offset="88%" stopColor={stopEdge} />
          <stop offset="100%" stopColor={stopEdge} />
        </radialGradient>

        {/* Inner halo — tight corona */}
        <radialGradient id="oasis-sun-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glowColor} stopOpacity="0.55" />
          <stop offset="45%" stopColor={glowColor} stopOpacity="0.22" />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
        </radialGradient>

        {/* Outer glow — diffuse atmosphere */}
        <radialGradient id="oasis-sun-outer" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glowColor} stopOpacity="0.18" />
          <stop offset="60%" stopColor={glowColor} stopOpacity="0.06" />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
        </radialGradient>

        {/* Atmospheric scatter at horizon — elongated ellipse below sun */}
        <radialGradient id="oasis-sun-scatter" cx="50%" cy="20%" r="50%">
          <stop
            offset="0%"
            stopColor={glowColor}
            stopOpacity={`${(scatterOpacity * 0.9).toFixed(2)}`}
          />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
        </radialGradient>

        {/* Soft blur for glow layers */}
        <filter id="oasis-sun-glow-blur" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation={glowRadius * 0.18} />
        </filter>
      </defs>

      {/* Atmospheric scatter band (horizon only) */}
      {showScatter && (
        <ellipse
          cx={cx}
          cy={cy + R * 0.6}
          rx={outerGlowR * 1.4}
          ry={outerGlowR * 0.8}
          fill="url(#oasis-sun-scatter)"
        />
      )}

      {/* Outer diffuse glow */}
      <circle cx={cx} cy={cy} r={R + outerGlowR} fill="url(#oasis-sun-outer)" />

      {/* Inner halo with blur */}
      <circle
        cx={cx}
        cy={cy}
        r={R + innerGlowR}
        fill="url(#oasis-sun-halo)"
        filter="url(#oasis-sun-glow-blur)"
      />

      {/* Sun disc — SVG <circle> fill, no border-radius, no clipping artifact */}
      <circle cx={cx} cy={cy} r={R} fill="url(#oasis-sun-disc)" />
    </svg>
  )
}

/* ─── Moon phase SVG ─────────────────────────────────────────────────────── */

function MoonDisc({ phase, size }: { phase: number; size: number }) {
  const R = size / 2
  const cx = R
  const cy = R
  const top = { x: cx, y: 0 }
  const bot = { x: cx, y: size }
  const termRx = Math.abs(Math.cos(phase * 2 * Math.PI)) * R

  let illuminatedPath: string

  if (phase < 0.01 || phase > 0.99) {
    illuminatedPath = ''
  } else if (phase > 0.49 && phase < 0.51) {
    illuminatedPath = `M ${top.x} ${top.y} A ${R} ${R} 0 1 1 ${bot.x} ${bot.y} A ${R} ${R} 0 1 1 ${top.x} ${top.y}`
  } else {
    const isWaxing = phase < 0.5
    if (isWaxing) {
      const termSweep = phase < 0.25 ? 1 : 0
      illuminatedPath = [
        `M ${top.x} ${top.y}`,
        `A ${R} ${R} 0 0 1 ${bot.x} ${bot.y}`,
        `A ${termRx.toFixed(2)} ${R} 0 0 ${termSweep} ${top.x} ${top.y}`,
      ].join(' ')
    } else {
      const wPhase = 1 - phase
      const wTermRx = Math.abs(Math.cos(wPhase * 2 * Math.PI)) * R
      const termSweep = wPhase < 0.25 ? 0 : 1
      illuminatedPath = [
        `M ${top.x} ${top.y}`,
        `A ${R} ${R} 0 0 0 ${bot.x} ${bot.y}`,
        `A ${wTermRx.toFixed(2)} ${R} 0 0 ${termSweep} ${top.x} ${top.y}`,
      ].join(' ')
    }
  }

  const brightness = 0.5 + Math.sin(phase * Math.PI) * 0.5
  const moonLight = `rgba(240,248,255,${(0.85 + brightness * 0.15).toFixed(2)})`

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} overflow="visible">
      <defs>
        <clipPath id={`moon-clip-${size}`}>
          <circle cx={cx} cy={cy} r={R} />
        </clipPath>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill={phase < 0.01 || phase > 0.99 ? 'rgba(20,20,40,0.6)' : '#0a1020'}
        clipPath={`url(#moon-clip-${size})`}
      />
      {illuminatedPath && (
        <path d={illuminatedPath} fill={moonLight} clipPath={`url(#moon-clip-${size})`} />
      )}
      <circle
        cx={cx}
        cy={cy}
        r={R - 1}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1}
        clipPath={`url(#moon-clip-${size})`}
      />
    </svg>
  )
}

/* ─── SkyLayer ───────────────────────────────────────────────────────────── */

export function SkyLayer({ atmosphere }: SkyLayerProps) {
  const { sunPosition, moonPosition, solarElevation, starsOpacity, lunarPhase, skyColors } =
    atmosphere
  const isDevOverride = useDevStore((s) => s.timeOverride !== null)

  // When dev override is active, use instant transitions so scrubbing is responsive.
  // In production / real-clock mode, use 90s for realistic imperceptible movement.
  const skyTransition = isDevOverride ? 'background 0.3s ease' : 'background 90s linear'
  const posTransition = isDevOverride
    ? 'left 0.3s ease, top 0.3s ease'
    : 'left 90s linear, top 90s linear'
  const opacityTransition = isDevOverride ? 'opacity 0.3s ease' : 'opacity 180s linear'
  const starsTransition = isDevOverride ? 'opacity 0.3s ease' : 'opacity 120s linear'
  const overlayTransition = isDevOverride ? 'opacity 0.3s ease' : 'opacity 90s linear'

  const sunProps = getSunProps(Math.max(0, solarElevation))
  const brightnessOverlay = getSkyBrightnessOverlay(solarElevation)

  // Sun opacity: full at elevation > 0.05, fade in/out near horizon
  const sunOpacity = sunPosition
    ? solarElevation >= 0.05
      ? 1
      : solarElevation > 0
        ? solarElevation / 0.05
        : 0
    : 0

  // Moon opacity: full when sun is well below horizon (elevation < -0.05)
  const absSolar = Math.abs(solarElevation)
  const moonOpacity = moonPosition
    ? solarElevation <= -0.05
      ? 1
      : solarElevation < 0
        ? absSolar / 0.05
        : 0
    : 0

  const moonElevation = moonPosition ? Math.sin(Math.PI * (1 - (moonPosition.y - 10) / 77)) : 0
  const moonSize = Math.round(46 - moonElevation * 8)

  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${skyColors.skyTop} 0%, ${skyColors.skyBottom} 100%)`,
          transition: skyTransition,
        }}
      />

      {/* Brightness overlay at solar noon */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(255,255,255,1)',
          opacity: brightnessOverlay,
          transition: overlayTransition,
          pointerEvents: 'none',
        }}
      />

      {/* Stars */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: starsOpacity, transition: starsTransition }}
      >
        {STARS.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [star.baseOpacity * 0.55, star.baseOpacity, star.baseOpacity * 0.55],
            }}
            transition={{
              repeat: Infinity,
              duration: star.twinkleDuration,
              ease: 'easeInOut',
              delay: star.twinkleDelay,
            }}
          />
        ))}
      </div>

      {/*
       * Sun — positioned via CSS left/top for the 90s arc transition.
       * The disc itself is SVG (no border-radius, no anti-aliasing artifact).
       */}
      {sunPosition && (
        <div
          style={{
            position: 'absolute',
            left: `${sunPosition.x}%`,
            top: `${sunPosition.y}%`,
            width: 0,
            height: 0,
            opacity: sunOpacity,
            transition: `${posTransition}, ${opacityTransition}`,
          }}
        >
          <SunDisc
            elevation={solarElevation}
            size={sunProps.size}
            discColor={sunProps.discColor}
            glowColor={sunProps.glowColor}
            glowRadius={sunProps.glowRadius}
          />
        </div>
      )}

      {/* Moon */}
      {moonPosition && (
        <div
          style={{
            position: 'absolute',
            left: `${moonPosition.x}%`,
            top: `${moonPosition.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: moonOpacity,
            transition: `${posTransition}, ${opacityTransition}`,
          }}
        >
          <MoonDisc phase={lunarPhase} size={moonSize} />
          <div
            style={{
              position: 'absolute',
              inset: -16,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(200,216,240,${(0.12 + Math.sin(lunarPhase * Math.PI) * 0.1).toFixed(2)}) 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />
        </div>
      )}
    </div>
  )
}
