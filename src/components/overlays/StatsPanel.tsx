/* ==========================================================================
   StatsPanel
   Pill-shaped glass panel anchored to the left edge.
   Mirroring SettingsPanel design language and spring animations.
   ========================================================================== */

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTimer } from '@/hooks/useTimer'
import { useTimerStore } from '@/stores/timerStore'
import { useOasisGrowth } from '@/hooks/useOasisGrowth'
import { useStreak } from '@/hooks/useStreak'
import { format } from '@/utils/formatters'
import { peekNextElement } from '@/engines/growthEngine'
import type { OasisElementType } from '@/types/oasis.types'

import { DatePalm } from '@/components/scene/elements/DatePalm'
import { Acacia } from '@/components/scene/elements/Acacia'
import { Succulent } from '@/components/scene/elements/Succulent'
import { DesertWillow } from '@/components/scene/elements/DesertWillow'

interface StatsPanelProps {
  open: boolean
  onClose: () => void
}

const panelVariants = {
  hidden: {
    x: -32,
    opacity: 0,
    scale: 0.97,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 280,
      damping: 28,
    },
  },
  exit: {
    x: -32,
    opacity: 0,
    scale: 0.97,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 32,
    },
  },
}

const backdropTransition = 'opacity 0.22s ease'

function Divider() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 1,
        background:
          'linear-gradient(90deg, transparent, var(--glass-border) 20%, var(--glass-border) 80%, transparent)',
        margin: '4px 0',
      }}
    />
  )
}

function PlantPreview({ type }: { type: OasisElementType }) {
  switch (type) {
    case 'palm':
      return <DatePalm />
    case 'acacia':
      return <Acacia />
    case 'succulent':
      return <Succulent />
    case 'willow':
      return <DesertWillow />
    default:
      return <DatePalm />
  }
}

const PLANT_DESCRIPTIONS: Record<string, string> = {
  palm: 'A hardy sprout of the phoenix dactylifera, drawing deep waters to rise tall against the desert winds.',
  acacia: 'A delicate sapling with feathery leaves, providing vital shelter and nourishment to the sands.',
  succulent: 'A resilient desert succulent, storing precious moisture within its thick, fleshy leaves.',
  willow: 'A graceful willow sprout, adapting to arid soils with its slender branches and soft green canopy.',
}

const PLANT_TITLES: Record<string, string> = {
  palm: 'Date Palm Sapling',
  acacia: 'Acacia Sapling',
  succulent: 'Desert Succulent',
  willow: 'Desert Willow Sprout',
}

export function StatsPanel({ open, onClose }: StatsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  
  const timer = useTimer()
  const { config } = useTimerStore()
  const growth = useOasisGrowth()
  const streak = useStreak()

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  /* Trap focus */
  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus()
    }
  }, [open])

  // Determine growing plant details
  const isFocusActive = (timer.status === 'active' || timer.status === 'paused') && timer.sessionType === 'focus'
  const activePlantType = isFocusActive
    ? (timer.previewElement?.type ?? 'palm')
    : peekNextElement(growth.oasis).type

  // Timing details
  const targetSeconds = isFocusActive
    ? config.focusDurationMinutes * 60
    : 25 * 60 // standard default display if idle
  
  const elapsedSeconds = isFocusActive
    ? targetSeconds - timer.timeRemainingSeconds
    : 0

  const activeProgress = isFocusActive ? timer.progress : 0
  const statusLabel = !isFocusActive
    ? 'Ready to Grow'
    : timer.status === 'paused'
      ? 'Paused'
      : 'Growing'

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={open ? onClose : undefined}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.18)',
          zIndex: 'var(--z-overlay-backdrop)' as unknown as number,
          cursor: 'pointer',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: backdropTransition,
        }}
      />

      {/* Slide-in panel */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Statistics"
        tabIndex={-1}
        variants={panelVariants}
        initial="hidden"
        animate={open ? 'visible' : 'hidden'}
        style={{
          position: 'absolute',
          left: 'clamp(56px, 15vw, 72px)',
          top: 'clamp(12px, 5vh, 40px)',
          bottom: 'clamp(12px, 5vh, 40px)',
          width: 'min(320px, calc(100vw - 80px))',
          maxHeight: 'calc(100dvh - 2 * clamp(12px, 5vh, 40px))',
          zIndex: 'var(--z-overlay)' as unknown as number,
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: open ? 'auto' : 'none',
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        <div
          className="glass-panel"
          style={{
            borderRadius: 28,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Specular highlight */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              right: '10%',
              height: 1,
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.5) 70%, transparent)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '22px 24px 18px',
              flexShrink: 0,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 500,
                color: 'var(--color-text-on-dark)',
                letterSpacing: '0.06em',
                margin: 0,
              }}
            >
              Statistics
            </h2>

            <button
              onClick={onClose}
              aria-label="Close statistics"
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: '1px solid var(--glass-border)',
                background: 'var(--glass-bg)',
                color: 'var(--color-text-on-dark-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                flexShrink: 0,
                transition: 'background 150ms, color 150ms',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--glass-bg-hover)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-on-dark)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--glass-bg)'
                ;(e.currentTarget as HTMLButtonElement).style.color =
                  'var(--color-text-on-dark-muted)'
              }}
            >
              ✕
            </button>
          </div>

          <Divider />

          {/* Body */}
          <div
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '20px 24px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(245,230,200,0.2) transparent',
            }}
          >
            {/* Active Plant Details Card */}
            <div>
              <p
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--color-text-on-dark-muted)',
                  letterSpacing: '0.08em',
                  marginBottom: 10,
                }}
              >
                Focus Growth
              </p>

              {/* Plant Image Card */}
              <div
                className="glass-surface flex items-center justify-center"
                style={{
                  height: 150,
                  borderRadius: 20,
                  position: 'relative',
                  background: 'radial-gradient(circle, rgba(240, 192, 96, 0.11) 0%, transparent 68%), var(--glass-bg)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    transform: 'scale(1.1) translateY(8px)',
                    transformOrigin: 'bottom center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    height: '100%',
                    paddingBottom: 16,
                  }}
                >
                  <PlantPreview type={activePlantType} />
                </div>
              </div>

              {/* Info & Stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 500,
                      color: 'var(--color-text-on-dark)',
                      margin: 0,
                    }}
                  >
                    {PLANT_TITLES[activePlantType] ?? 'Sapling'}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      color: isFocusActive ? 'var(--color-lantern-gold)' : 'var(--color-text-on-dark-muted)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {statusLabel}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--color-text-on-dark-muted)',
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  {PLANT_DESCRIPTIONS[activePlantType] ?? 'A beautiful addition to your oasis.'}
                </p>

                {/* Progress Bar & Durations */}
                <div style={{ marginTop: 10 }}>
                  <div
                    style={{
                      height: 5,
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.08)',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <motion.div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        background: 'var(--color-lantern-gold)',
                        width: `${activeProgress * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-on-dark-muted)',
                      marginTop: 6,
                    }}
                  >
                    <span>{format.countdown(elapsedSeconds)} elapsed</span>
                    <span>{format.countdown(targetSeconds)} target</span>
                  </div>
                </div>
              </div>
            </div>

            <Divider />

            {/* Oasis Statistics Grid */}
            <div>
              <p
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--color-text-on-dark-muted)',
                  letterSpacing: '0.08em',
                  marginBottom: 12,
                }}
              >
                Oasis Stats
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="glass-surface" style={{ padding: '12px 14px', borderRadius: 14 }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--color-text-on-dark-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Streak
                  </span>
                  <p style={{ fontSize: '1.15rem', fontFamily: 'var(--font-display)', color: 'var(--color-lantern-gold)', fontWeight: 500, margin: '2px 0 0' }}>
                    {streak.currentStreakDays} {streak.currentStreakDays === 1 ? 'Day' : 'Days'}
                  </p>
                </div>
                <div className="glass-surface" style={{ padding: '12px 14px', borderRadius: 14 }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--color-text-on-dark-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Total Focus
                  </span>
                  <p style={{ fontSize: '1.15rem', fontFamily: 'var(--font-display)', color: '#ffffff', fontWeight: 500, margin: '2px 0 0' }}>
                    {format.duration(streak.totalMinutes)}
                  </p>
                </div>
                <div className="glass-surface" style={{ padding: '12px 14px', borderRadius: 14 }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--color-text-on-dark-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Plants Grown
                  </span>
                  <p style={{ fontSize: '1.15rem', fontFamily: 'var(--font-display)', color: '#ffffff', fontWeight: 500, margin: '2px 0 0' }}>
                    {growth.oasis.elements.length}
                  </p>
                </div>
                <div className="glass-surface" style={{ padding: '12px 14px', borderRadius: 14 }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--color-text-on-dark-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Today's Focus
                  </span>
                  <p style={{ fontSize: '1.15rem', fontFamily: 'var(--font-display)', color: '#ffffff', fontWeight: 500, margin: '2px 0 0' }}>
                    {format.duration(streak.todayMinutes)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
