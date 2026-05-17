import { motion } from 'framer-motion'

export function Sprout() {
  return (
    <motion.svg
      width="28" height="40" viewBox="0 0 28 40" fill="none"
      animate={{ rotate: [-1.5, 1.5, -1.5] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      {/* Stem */}
      <path d="M14 38 C14 28 14 18 14 10" stroke="#5a8f6b" strokeWidth="2" strokeLinecap="round" />
      {/* Left leaf */}
      <path d="M14 22 C8 18 4 12 8 8 C10 14 12 18 14 22Z" fill="#4a7a58" />
      {/* Right leaf */}
      <path d="M14 18 C20 14 24 8 20 4 C18 10 16 14 14 18Z" fill="#5a8f6b" />
    </motion.svg>
  )
}
