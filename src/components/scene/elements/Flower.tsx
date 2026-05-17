import { motion } from 'framer-motion'

export function Flower() {
  return (
    <motion.svg
      width="36" height="52" viewBox="0 0 36 52" fill="none"
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      {/* Stem */}
      <path d="M18 50 C18 38 16 28 18 18" stroke="#5a8f6b" strokeWidth="2" strokeLinecap="round" />
      {/* Petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={i}
          cx={18 + Math.cos((angle * Math.PI) / 180) * 7}
          cy={16 + Math.sin((angle * Math.PI) / 180) * 7}
          rx="4.5" ry="3"
          transform={`rotate(${angle} ${18 + Math.cos((angle * Math.PI) / 180) * 7} ${16 + Math.sin((angle * Math.PI) / 180) * 7})`}
          fill="#e8a878"
          opacity="0.9"
        />
      ))}
      {/* Centre */}
      <circle cx="18" cy="16" r="4" fill="#f0c060" />
    </motion.svg>
  )
}
