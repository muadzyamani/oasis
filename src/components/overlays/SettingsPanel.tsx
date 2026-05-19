/* ==========================================================================
   SettingsPanel
   Pill-shaped glass panel anchored to the left edge.
   Slides in from the left with Apple-style spring physics.
   Dismissed via backdrop click, close button, or Escape key.
   ========================================================================== */

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TimerSection } from './settings/TimerSection'
import { AutomationSection } from './settings/AutomationSection'
import { AppearanceSection } from './settings/AppearanceSection'
import { SundialSection } from './settings/SundialSection'

interface SettingsPanelProps {
  open: boolean
  onClose: () => void
}

/* ── Animation variants ────────────────────────────────────────────────────── */
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

/* Backdrop fades purely via CSS — no Framer Motion mount/unmount */
const backdropTransition = 'opacity 0.22s ease'

/* ── Divider ───────────────────────────────────────────────────────────────── */
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

/* ── Main component ────────────────────────────────────────────────────────── */
export function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  /* Trap focus inside panel when open */
  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus()
    }
  }, [open])

  return (
    <>
      {/*
       * ── Backdrop ──
       * Always in DOM. CSS opacity + pointer-events control visibility.
       * Avoids compositor tree re-promotion on mount that flashes scene layers.
       */}
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

      {/*
       * ── Panel ──
       * Always in DOM. Framer Motion animates x/opacity/scale only.
       * The compositor layer for backdrop-filter is registered at startup,
       * not on open, so no sibling layers are re-promoted when the panel appears.
       */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        tabIndex={-1}
        variants={panelVariants}
        initial="hidden"
        animate={open ? 'visible' : 'hidden'}
        style={{
          position: 'absolute',
          /* Sit just to the right of the NavigationRail, dynamically adjust for small screens */
          left: 'clamp(56px, 15vw, 72px)',
          /* Respect viewport — dynamic margin top and bottom */
          top: 'clamp(12px, 5vh, 40px)',
          bottom: 'clamp(12px, 5vh, 40px)',
          /* Dynamically adjust width to prevent bleeding off screen */
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
        {/* Glass surface */}
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
          {/* Specular top edge — Apple Glass signature */}
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

          {/* ── Header ── */}
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
              Settings
            </h2>

            <button
              onClick={onClose}
              aria-label="Close settings"
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
                ;(e.currentTarget as HTMLButtonElement).style.background =
                  'var(--glass-bg-hover)'
                ;(e.currentTarget as HTMLButtonElement).style.color =
                  'var(--color-text-on-dark)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background =
                  'var(--glass-bg)'
                ;(e.currentTarget as HTMLButtonElement).style.color =
                  'var(--color-text-on-dark-muted)'
              }}
            >
              ✕
            </button>
          </div>

          <Divider />

          {/* ── Scrollable body ── */}
          <div
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '20px 24px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
              /* Custom thin scrollbar */
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(245,230,200,0.2) transparent',
            }}
          >
            <TimerSection />
            <Divider />
            <AutomationSection />
            <Divider />
            <AppearanceSection />
            <Divider />
            <SundialSection />
          </div>
        </div>
      </motion.div>
    </>
  )
}
