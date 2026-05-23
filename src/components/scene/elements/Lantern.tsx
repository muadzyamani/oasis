import { motion } from 'framer-motion'

export function Lantern() {
  return (
    <motion.svg
      width="32"
      height="60"
      viewBox="0 0 32 60"
      fill="none"
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
      style={{ transformOrigin: 'top center', overflow: 'visible' }}
    >
      {/* Hanging cord */}
      <line x1="16" y1="0" x2="16" y2="12" stroke="#5a4030" strokeWidth="1.5" />
      {/* Lantern body */}
      <rect x="6" y="12" width="20" height="28" rx="4" fill="#1a1008" opacity="0.8" />
      {/* Glass panels — warm glow */}
      <rect x="8" y="14" width="7" height="24" rx="2" fill="#f0c060" opacity="0.35" />
      <rect x="17" y="14" width="7" height="24" rx="2" fill="#f0c060" opacity="0.35" />
      {/* Top cap */}
      <path d="M4 12 L16 6 L28 12Z" fill="#5a4030" />
      {/* Bottom cap */}
      <path d="M6 40 L16 46 L26 40Z" fill="#5a4030" />
      {/* Glow effect */}
      <motion.ellipse
        cx="16"
        cy="30"
        rx="20"
        ry="14"
        fill="#f0c060"
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
}
