import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface FireflyProps {
  seed?: number
}

export function Firefly({ seed = 0 }: FireflyProps) {
  const { dx, dy, duration } = useMemo(
    () => ({
      dx: 8 + (seed % 3) * 4,
      dy: 6 + (seed % 2) * 3,
      duration: 3 + (seed % 4) * 0.8,
    }),
    [seed],
  )

  return (
    <motion.div
      style={{ width: 8, height: 8, position: 'relative' }}
      animate={{ x: [-dx, dx, -dx], y: [-dy, dy, -dy] }}
      transition={{ repeat: Infinity, duration, ease: 'easeInOut', delay: seed * 0.3 }}
    >
      {/* Outer glow */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -6,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,220,80,0.4) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 + (seed % 3) * 0.4, ease: 'easeInOut' }}
      />
      {/* Core dot */}
      <div
        style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: '#f0dc50',
          margin: '2px',
          boxShadow: '0 0 6px 2px rgba(240,220,80,0.7)',
        }}
      />
    </motion.div>
  )
}
