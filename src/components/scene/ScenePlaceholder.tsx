import { useEffect, useState } from 'react'
import type { TimeOfDay } from '@/types/growth.types'

/* ==========================================================================
   ScenePlaceholder
   A hand-crafted CSS gradient scene using the Oasis design tokens.
   Represents the full visual atmosphere of the app before the animated
   scene system is built in Phase 2.

   Layers (back to front):
     1. Sky gradient — time-of-day responsive
     2. Distant dunes silhouette (SVG)
     3. Water band
     4. Near ground plane
     5. Atmospheric particles (CSS stars for night)
   ========================================================================== */

interface SceneConfig {
  skyTop: string
  skyBottom: string
  groundColor: string
  waterColor: string
  showStars: boolean
  moonOpacity: number
  sunOpacity: number
  atmosphereLabel: string
}

const SCENE_CONFIGS: Record<TimeOfDay, SceneConfig> = {
  dawn: {
    skyTop: '#2D1B3D',
    skyBottom: '#E8845A',
    groundColor: '#C4956A',
    waterColor: '#4A7E8F',
    showStars: false,
    moonOpacity: 0.3,
    sunOpacity: 0.6,
    atmosphereLabel: 'Dawn',
  },
  morning: {
    skyTop: '#5B9BD5',
    skyBottom: '#F5D78A',
    groundColor: '#D4A96A',
    waterColor: '#2A6B7C',
    showStars: false,
    moonOpacity: 0,
    sunOpacity: 1,
    atmosphereLabel: 'Morning',
  },
  afternoon: {
    skyTop: '#2E6FA3',
    skyBottom: '#E8954A',
    groundColor: '#C08050',
    waterColor: '#1E5A6B',
    showStars: false,
    moonOpacity: 0,
    sunOpacity: 0.8,
    atmosphereLabel: 'Afternoon',
  },
  dusk: {
    skyTop: '#1A1035',
    skyBottom: '#C0503A',
    groundColor: '#8B5E3C',
    waterColor: '#1A4A57',
    showStars: true,
    moonOpacity: 0.5,
    sunOpacity: 0,
    atmosphereLabel: 'Dusk',
  },
  night: {
    skyTop: '#060E1A',
    skyBottom: '#0D1B2A',
    groundColor: '#1A1008',
    waterColor: '#0D2A35',
    showStars: true,
    moonOpacity: 1,
    sunOpacity: 0,
    atmosphereLabel: 'Night',
  },
}

// Generate star positions (seeded for consistency)
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: (i * 137.5) % 100,
  y: (i * 97.3) % 60,
  size: i % 3 === 0 ? 2 : 1,
  opacity: 0.3 + (i % 5) * 0.14,
}))

export function ScenePlaceholder() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(() => {
    const h = new Date().getHours()
    if (h >= 5 && h < 8) return 'dawn'
    if (h >= 8 && h < 17) return 'morning'
    if (h >= 17 && h < 19) return 'afternoon'
    if (h >= 19 && h < 21) return 'dusk'
    return 'night'
  })

  // Update time of day every minute
  useEffect(() => {
    const update = () => {
      const h = new Date().getHours()
      let tod: TimeOfDay = 'night'
      if (h >= 5 && h < 8) tod = 'dawn'
      else if (h >= 8 && h < 17) tod = 'morning'
      else if (h >= 17 && h < 19) tod = 'afternoon'
      else if (h >= 19 && h < 21) tod = 'dusk'
      setTimeOfDay(tod)
    }
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])

  const scene = SCENE_CONFIGS[timeOfDay]

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 'var(--z-scene)' }}
      aria-hidden="true"
      role="presentation"
    >
      {/* ── Sky gradient ── */}
      <div
        className="absolute inset-0 ambient-transition"
        style={{
          background: `linear-gradient(to bottom, ${scene.skyTop} 0%, ${scene.skyBottom} 100%)`,
        }}
      />

      {/* ── Stars (night / dusk) ── */}
      {scene.showStars && (
        <div className="absolute inset-0 pointer-events-none">
          {STARS.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white ambient-transition"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                opacity: scene.showStars ? star.opacity : 0,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Moon ── */}
      <div
        className="absolute ambient-transition"
        style={{
          top: '12%',
          right: '18%',
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #EEF4FF, #C8D8E8)',
          boxShadow: '0 0 32px rgba(214, 228, 240, 0.3)',
          opacity: scene.moonOpacity,
        }}
      />

      {/* ── Sun ── */}
      <div
        className="absolute ambient-transition"
        style={{
          top: '15%',
          left: '20%',
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #FFF0A0, #F0C060)',
          boxShadow: '0 0 48px rgba(240, 192, 96, 0.5)',
          opacity: scene.sunOpacity,
        }}
      />

      {/* ── Distant dunes SVG silhouette ── */}
      <div className="absolute bottom-0 left-0 right-0" style={{ bottom: '30%' }}>
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full ambient-transition"
          style={{ height: 120, display: 'block' }}
        >
          <path
            d="M0,80 C180,20 360,100 540,60 C720,20 900,90 1080,50 C1260,10 1380,70 1440,60 L1440,120 L0,120 Z"
            fill={scene.groundColor}
            fillOpacity="0.5"
          />
          <path
            d="M0,100 C240,60 480,110 720,80 C960,50 1200,100 1440,85 L1440,120 L0,120 Z"
            fill={scene.groundColor}
            fillOpacity="0.7"
          />
        </svg>
      </div>

      {/* ── Water band ── */}
      <div
        className="absolute left-0 right-0 ambient-transition"
        style={{
          bottom: '22%',
          height: '10%',
          background: `linear-gradient(to bottom, ${scene.waterColor}AA, ${scene.waterColor}FF)`,
          borderRadius: '50% 50% 0 0 / 10px 10px 0 0',
        }}
      >
        {/* Water shimmer lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.4) 40px,
              rgba(255,255,255,0.4) 42px
            )`,
          }}
        />
      </div>

      {/* ── Near ground plane ── */}
      <div
        className="absolute bottom-0 left-0 right-0 ambient-transition"
        style={{
          height: '24%',
          background: `linear-gradient(to top, ${scene.groundColor}FF, ${scene.groundColor}AA)`,
        }}
      />

      {/* ── Lantern gold horizon glow (focus atmosphere hint) ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 ambient-transition"
        style={{
          bottom: '28%',
          width: '40%',
          height: 80,
          background:
            'radial-gradient(ellipse at center, rgba(240,192,96,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Atmosphere label (dev helper — remove in production) ── */}
      {import.meta.env.DEV && (
        <div
          className="absolute top-4 right-4 text-xs font-mono opacity-30"
          style={{ color: 'var(--color-text-on-dark)', zIndex: 'var(--z-widget)' }}
        >
          {scene.atmosphereLabel}
        </div>
      )}
    </div>
  )
}
