import { motion } from 'framer-motion'

export function DesertWillow() {
  return (
    <motion.svg
      width="60"
      height="120"
      viewBox="-50 20 100 255"
      fill="none"
      animate={{ rotate: [-1.4, 1.4, -1.4] }}
      transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      {/* Translucent bottom shadow */}
      <ellipse cx="10" cy="265" rx="22" ry="4" fill="#c2a87d" opacity="0.6" />
      
      {/* Main branch stems */}
      <path
        d="M 0 250 Q -5 200 5 150 Q 15 100 10 60"
        fill="none"
        stroke="#6a6a5a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 5 150 Q 30 140 40 110" fill="none" stroke="#6a6a5a" strokeWidth="1.5" />
      <path d="M 10 120 Q -15 110 -25 80" fill="none" stroke="#6a6a5a" strokeWidth="1.5" />
      <path d="M 12 80 Q -5 60 -15 30" fill="none" stroke="#6a6a5a" strokeWidth="1.5" />
      
      {/* Leaf clusters */}
      <g fill="#7a9c7a">
        <circle cx="25" cy="140" r="8" />
        <circle cx="35" cy="125" r="7" />
        <circle cx="15" cy="130" r="6" />
        <circle cx="-10" cy="105" r="8" />
        <circle cx="-20" cy="90" r="7" />
        <circle cx="0" cy="95" r="6" />
        <circle cx="5" cy="75" r="7" />
        <circle cx="-10" cy="55" r="6" />
        <circle cx="15" cy="60" r="5" />
        <circle cx="10" cy="60" r="8" />
        <circle cx="0" cy="45" r="6" />
      </g>
      
      {/* Soil base mound */}
      <ellipse cx="0" cy="260" rx="22" ry="5" fill="#c2a87d" />
    </motion.svg>
  )
}
