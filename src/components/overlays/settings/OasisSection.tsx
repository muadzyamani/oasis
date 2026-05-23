/* ==========================================================================
   OasisSection
   Oasis-specific management.
   Allows clearing all grown flora/elements from the scene.
   Reads/writes oasisStore.
   ========================================================================== */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOasisStore } from '@/stores/oasisStore'
import { SectionHeading } from './TimerSection'

export function OasisSection() {
  const { oasis, clearElements } = useOasisStore()
  const [confirming, setConfirming] = useState(false)

  const elementCount = oasis.elements.length
  const isDisabled = elementCount === 0

  const handleClear = () => {
    clearElements()
    setConfirming(false)
  }

  return (
    <section>
      <SectionHeading>Oasis</SectionHeading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'rgba(245,230,200,0.45)',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Reset the visual scene by clearing all grown trees and plants. Your total focus minutes
          and current level will not be affected.
        </p>

        {isDisabled ? (
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'rgba(245,230,200,0.3)',
              padding: '6px 0',
              fontStyle: 'italic',
            }}
          >
            No plants grown yet in this oasis.
          </div>
        ) : (
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: 40 }}>
            <AnimatePresence mode="wait">
              {!confirming ? (
                <motion.button
                  key="clear-btn"
                  onClick={() => setConfirming(true)}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    padding: '10px 16px',
                    borderRadius: 999,
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    color: 'var(--color-text-on-dark-muted)',
                    cursor: 'pointer',
                    transition: 'background 150ms, color 150ms, border-color 150ms',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget
                    btn.style.background = 'var(--glass-bg-hover)'
                    btn.style.color = 'var(--color-text-on-dark)'
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget
                    btn.style.background = 'var(--glass-bg)'
                    btn.style.color = 'var(--color-text-on-dark-muted)'
                  }}
                >
                  Clear Grown Plants ({elementCount})
                </motion.button>
              ) : (
                <motion.div
                  key="confirm-dialog"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    padding: '12px 14px',
                    borderRadius: 14,
                    border: '1px solid rgba(220, 80, 80, 0.25)',
                    background: 'rgba(220, 80, 80, 0.05)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'rgba(255, 120, 120, 0.95)',
                      textAlign: 'center',
                    }}
                  >
                    Are you sure? This cannot be undone.
                  </span>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setConfirming(false)}
                      style={{
                        flex: 1,
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        padding: '6px 12px',
                        borderRadius: 999,
                        border: '1px solid var(--glass-border)',
                        background: 'var(--glass-bg)',
                        color: 'var(--color-text-on-dark-muted)',
                        cursor: 'pointer',
                        transition: 'background 150ms, color 150ms',
                        textAlign: 'center',
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget
                        btn.style.background = 'var(--glass-bg-hover)'
                        btn.style.color = 'var(--color-text-on-dark)'
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget
                        btn.style.background = 'var(--glass-bg)'
                        btn.style.color = 'var(--color-text-on-dark-muted)'
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleClear}
                      style={{
                        flex: 1,
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        padding: '6px 12px',
                        borderRadius: 999,
                        border: '1px solid rgba(220, 80, 80, 0.4)',
                        background: 'rgba(220, 80, 80, 0.2)',
                        color: 'rgba(255, 120, 120, 0.95)',
                        cursor: 'pointer',
                        transition: 'background 150ms, border-color 150ms',
                        textAlign: 'center',
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget
                        btn.style.background = 'rgba(220, 80, 80, 0.35)'
                        btn.style.borderColor = 'rgba(220, 80, 80, 0.6)'
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget
                        btn.style.background = 'rgba(220, 80, 80, 0.2)'
                        btn.style.borderColor = 'rgba(220, 80, 80, 0.4)'
                      }}
                    >
                      Yes, Clear
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
