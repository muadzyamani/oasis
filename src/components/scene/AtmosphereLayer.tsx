import { motion } from 'framer-motion'

interface AtmosphereLayerProps {
  sessionActive: boolean
  sessionProgress: number
  isBreak: boolean
}

// Seeded dust particles
const DUST = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  startY: 30 + ((i * 23) % 40),
  size: 1 + (i % 2),
  duration: 12 + (i % 5) * 3,
  delay: i * 1.4,
  opacity: 0.06 + (i % 3) * 0.04,
}))

export function AtmosphereLayer({ sessionActive, sessionProgress, isBreak }: AtmosphereLayerProps) {
  const focusGlowOpacity = sessionActive && !isBreak ? 0.06 + sessionProgress * 0.1 : 0

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 6 }}>
      {/* Sand dust particles */}
      {DUST.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            top: `${p.startY}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgba(212, 169, 106, 1)',
            opacity: p.opacity,
          }}
          animate={{ x: ['0vw', '105vw'] }}
          transition={{ repeat: Infinity, duration: p.duration, ease: 'linear', delay: p.delay }}
        />
      ))}

      {/* Focus glow — warm horizon radial during active sessions */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '22%',
          left: '50%',
          transform: 'translate(-50%, 50%)',
          width: '60%',
          height: 120,
          background: 'radial-gradient(ellipse at center, rgba(240,192,96,1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        animate={{ opacity: focusGlowOpacity }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Break overlay — cool blue softness */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(100,160,220,0.06) 0%, transparent 60%)',
        }}
        animate={{ opacity: isBreak ? 1 : 0 }}
        transition={{ duration: 2 }}
      />

      {/* Session 50% lantern milestone glow */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '22%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,192,96,0.5), transparent 70%)',
        }}
        animate={{ opacity: sessionActive && sessionProgress >= 0.5 ? [0.4, 0.8, 0.4] : 0 }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
    </div>
  )
}
