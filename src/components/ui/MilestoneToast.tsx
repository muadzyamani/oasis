import { AnimatePresence, motion } from 'framer-motion'

interface MilestoneToastProps {
  message: string | null
  onDismiss: () => void
}

export function MilestoneToast({ message, onDismiss }: MilestoneToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          onAnimationComplete={() => {
            // Auto-dismiss after 4s
            const t = setTimeout(onDismiss, 4000)
            return () => clearTimeout(t)
          }}
          onClick={onDismiss}
          style={{
            position: 'fixed',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 'var(--z-toast)' as unknown as number,
            cursor: 'pointer',
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: '12px 24px',
              borderRadius: 999,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: 'var(--color-lantern-gold)', fontSize: '0.85rem' }}>✦</span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--color-text-on-dark)',
                letterSpacing: '0.02em',
              }}
            >
              {message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Helper: generate toast message from growth event context
export function buildToastMessage(elementType: string, tierUp: boolean, tierName?: string): string {
  if (tierUp && tierName) return `Your oasis reaches the ${tierName} stage.`
  const messages: Record<string, string> = {
    sprout:    'A new sprout has taken root.',
    flower:    'A flower opens in the silence.',
    reed:      'Reeds grow at the water\'s edge.',
    palm:      'A palm rises toward the sky.',
    lantern:   'A lantern lights itself.',
    lily:      'A lotus rests on the water.',
    firefly:   'Fireflies emerge at dusk.',
    waterfall: 'The sound of water fills your oasis.',
  }
  return messages[elementType] ?? 'Your oasis grows.'
}
