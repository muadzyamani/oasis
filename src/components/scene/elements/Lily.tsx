import { motion } from 'framer-motion'

export function Lily() {
  return (
    <motion.svg
      width="52"
      height="32"
      viewBox="0 0 52 32"
      fill="none"
      animate={{ y: [-1, 1, -1] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
      style={{ overflow: 'visible' }}
    >
      {/* Pad */}
      <ellipse cx="26" cy="26" rx="24" ry="6" fill="#3d6b4f" opacity="0.85" />
      {/* Pad notch */}
      <path d="M26 20 L26 32" stroke="#2a4a38" strokeWidth="1.5" />
      {/* Flower petals */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <ellipse
          key={i}
          cx={26 + Math.cos((angle * Math.PI) / 180) * 6}
          cy={16 + Math.sin((angle * Math.PI) / 180) * 4}
          rx="4"
          ry="6"
          transform={`rotate(${angle} ${26 + Math.cos((angle * Math.PI) / 180) * 6} ${16 + Math.sin((angle * Math.PI) / 180) * 4})`}
          fill="#f0e0f0"
          opacity="0.9"
        />
      ))}
      {/* Centre */}
      <circle cx="26" cy="16" r="3.5" fill="#f0c060" />
    </motion.svg>
  )
}
