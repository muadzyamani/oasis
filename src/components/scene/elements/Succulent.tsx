import { motion } from 'framer-motion'

export function Succulent() {
  return (
    <motion.svg
      width="60"
      height="120"
      viewBox="-45 165 90 110"
      fill="none"
      animate={{ scaleY: [0.98, 1.02, 0.98] }}
      transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      {/* Translucent bottom shadow */}
      <ellipse cx="10" cy="270" rx="28" ry="4" fill="#c2a87d" opacity="0.6" />
      
      {/* Petals/Leaves (bottom to top layering) */}
      <ellipse cx="0" cy="245" rx="18" ry="22" fill="#4e7a54" />
      <ellipse cx="-12" cy="235" rx="14" ry="20" fill="#5e8a64" transform="rotate(-35 -12 235)" />
      <ellipse cx="12" cy="235" rx="14" ry="20" fill="#5e8a64" transform="rotate(35 12 235)" />
      <ellipse cx="-22" cy="220" rx="11" ry="16" fill="#6e9a74" transform="rotate(-60 -22 220)" />
      <ellipse cx="22" cy="220" rx="11" ry="16" fill="#6e9a74" transform="rotate(60 22 220)" />
      <ellipse cx="-25" cy="200" rx="9" ry="13" fill="#7eaa84" transform="rotate(-80 -25 200)" />
      <ellipse cx="25" cy="200" rx="9" ry="13" fill="#7eaa84" transform="rotate(80 25 200)" />
      <ellipse cx="-12" cy="185" rx="8" ry="11" fill="#8eba94" transform="rotate(-25 -12 185)" />
      <ellipse cx="12" cy="185" rx="8" ry="11" fill="#8eba94" transform="rotate(25 12 185)" />
      
      {/* Soil base mound */}
      <ellipse cx="0" cy="260" rx="28" ry="6" fill="#c2a87d" />
    </motion.svg>
  )
}
