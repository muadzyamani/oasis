import { motion } from 'framer-motion'

export function Sprout() {
  return (
    <motion.svg
      width="40"
      height="50"
      viewBox="0 0 40 50"
      fill="none"
      animate={{ rotate: [-1.5, 1.5, -1.5] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      {/* Small mound of soil */}
      <ellipse cx="20" cy="45" rx="18" ry="8" fill="#8B7355" opacity="0.8" />
      <ellipse cx="20" cy="43" rx="15" ry="6" fill="#A0826B" opacity="0.9" />

      {/* Soil texture dots */}
      <circle cx="15" cy="47" r="1.5" fill="#6B5442" opacity="0.6" />
      <circle cx="25" cy="46" r="1.2" fill="#6B5442" opacity="0.6" />
      <circle cx="18" cy="49" r="1" fill="#6B5442" opacity="0.6" />

      {/* Tiny emerging shoot */}
      <path
        d="M20 43 Q19 30 18 20"
        stroke="#6B9B3A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* First tiny leaves (V-shape) */}
      <path
        d="M18 20 Q12 10 8 3"
        stroke="#7CB342"
        strokeWidth="2.5"
        fill="#8BC34A"
        opacity="0.9"
        strokeLinecap="round"
      />
      <path
        d="M18 20 Q24 10 28 3"
        stroke="#7CB342"
        strokeWidth="2.5"
        fill="#8BC34A"
        opacity="0.9"
        strokeLinecap="round"
      />

      {/* Tiny central spike */}
      <path
        d="M18 20 Q18 13 18 7"
        stroke="#9ACD32"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}
