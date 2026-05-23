import { motion } from 'framer-motion'

export function Reed() {
  return (
    <motion.svg
      width="24"
      height="88"
      viewBox="0 0 24 88"
      fill="none"
      animate={{ rotate: [-3, 3, -3] }}
      transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      {/* Main stem */}
      <path d="M12 86 C11 70 12 40 13 8" stroke="#6b8c3d" strokeWidth="2.5" strokeLinecap="round" />
      {/* Horizontal lines (nodes) */}
      {[30, 50, 68].map((y, i) => (
        <line
          key={i}
          x1="8"
          y1={y}
          x2="16"
          y2={y}
          stroke="#5a7830"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
      {/* Tip tuft */}
      <ellipse cx="13" cy="8" rx="3" ry="6" fill="#8aaa50" opacity="0.85" />
    </motion.svg>
  )
}
