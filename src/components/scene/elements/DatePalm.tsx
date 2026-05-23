import { motion } from 'framer-motion'

export function DatePalm() {
  return (
    <motion.svg
      width="60"
      height="120"
      viewBox="-60 40 120 235"
      fill="none"
      animate={{ rotate: [-1.5, 1.5, -1.5] }}
      transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      {/* Translucent bottom shadow */}
      <ellipse cx="10" cy="265" rx="25" ry="4" fill="#c2a87d" opacity="0.6" />
      
      {/* Trunk */}
      <path d="M 0 250 Q 5 200 0 150" fill="none" stroke="#6b5344" strokeWidth="4" strokeLinecap="round" />
      
      {/* Fronds */}
      <path d="M 0 150 Q -40 120 -50 90 Q -20 130 0 150" fill="#4a7c59" />
      <path d="M 0 150 Q 40 110 60 80 Q 20 130 0 150" fill="#5a9c69" />
      <path d="M 0 150 Q -15 100 -25 60 Q -5 120 0 150" fill="#3a6c49" />
      <path d="M 0 150 Q 25 100 15 50 Q 10 120 0 150" fill="#6aac79" />
      <path d="M 0 150 Q 0 100 -5 70 Q 5 120 0 150" fill="#4a7c59" />
      
      {/* Soil base mound */}
      <ellipse cx="0" cy="260" rx="25" ry="6" fill="#c2a87d" />
    </motion.svg>
  )
}
