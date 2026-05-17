import { motion } from 'framer-motion'

export function Palm() {
  return (
    <motion.svg
      width="80" height="120" viewBox="0 0 80 120" fill="none"
      animate={{ rotate: [-1, 1, -1] }}
      transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      {/* Trunk — gently curved */}
      <path d="M40 118 C38 90 36 60 42 20" stroke="#8b6040" strokeWidth="6" strokeLinecap="round" />
      {/* Fronds */}
      {[
        { d: 'M42 22 C30 10 10 6 4 14', rot: 0 },
        { d: 'M42 22 C50 8 68 2 76 10', rot: 0 },
        { d: 'M42 22 C28 16 8 20 6 30', rot: 0 },
        { d: 'M42 22 C56 16 74 20 76 30', rot: 0 },
        { d: 'M42 22 C38 8 36 -4 44 -2', rot: 0 },
      ].map(({ d }, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#3d6b4f"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 3 + i * 0.4, ease: 'easeInOut', delay: i * 0.2 }}
          style={{ transformOrigin: '42px 22px' }}
        />
      ))}
    </motion.svg>
  )
}
