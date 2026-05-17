import type { AtmosphereState, TimeOfDay } from '@/types/growth.types'
import { getTimeOfDay } from '@/types/growth.types'

/* ==========================================================================
   Ambient Engine — Pure Functions
   Computes AtmosphereState from real time + session context.
   No side effects; consumed by useAmbient hook.
   ========================================================================== */

export interface SceneColors {
  skyTop: string
  skyBottom: string
  groundColor: string
  waterColor: string
  groundFar: string
}

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

export function computeAtmosphere(
  hour: number,
  sessionActive: boolean,
  sessionProgress: number,
  isBreak: boolean,
): AtmosphereState {
  return {
    timeOfDay: getTimeOfDay(hour),
    sessionActive,
    sessionProgress,
    isBreak,
  }
}

export function getShowStars(timeOfDay: TimeOfDay): boolean {
  return timeOfDay === 'night' || timeOfDay === 'dusk'
}

export function getSunOpacity(timeOfDay: TimeOfDay): number {
  const map: Record<TimeOfDay, number> = { dawn: 0.6, morning: 1, afternoon: 0.85, dusk: 0, night: 0 }
  return map[timeOfDay]
}

export function getMoonOpacity(timeOfDay: TimeOfDay): number {
  const map: Record<TimeOfDay, number> = { dawn: 0.3, morning: 0, afternoon: 0, dusk: 0.6, night: 1 }
  return map[timeOfDay]
}

export function getSunPosition(timeOfDay: TimeOfDay): { x: string; y: string } {
  const map: Record<TimeOfDay, { x: string; y: string }> = {
    dawn:      { x: '12%', y: '72%' },
    morning:   { x: '22%', y: '18%' },
    afternoon: { x: '55%', y: '12%' },
    dusk:      { x: '82%', y: '68%' },
    night:     { x: '80%', y: '80%' },
  }
  return map[timeOfDay]
}

export function getMoonPosition(timeOfDay: TimeOfDay): { x: string; y: string } {
  const map: Record<TimeOfDay, { x: string; y: string }> = {
    dawn:      { x: '78%', y: '15%' },
    morning:   { x: '85%', y: '8%' },
    afternoon: { x: '88%', y: '10%' },
    dusk:      { x: '75%', y: '20%' },
    night:     { x: '70%', y: '12%' },
  }
  return map[timeOfDay]
}
