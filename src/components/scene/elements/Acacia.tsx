import { motion } from 'framer-motion'

export function Acacia() {
  return (
    <motion.svg
      width="60"
      height="120"
      viewBox="-40 80 80 195"
      fill="none"
      animate={{ rotate: [-1.2, 1.2, -1.2] }}
      transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      {/* Translucent bottom shadow */}
      <ellipse cx="10" cy="265" rx="20" ry="4" fill="#c2a87d" opacity="0.6" />
      
      {/* Trunk */}
      <path
        d="M 0 250 L -10 210 L 15 170 L -5 130 L 10 90"
        fill="none"
        stroke="#5a6a4a"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      
      {/* Leaf pairs */}
      <g fill="#7cb342">
        <ellipse cx="-15" cy="225" rx="4" ry="12" transform="rotate(-30 -15 225)" />
        <ellipse cx="5" cy="225" rx="4" ry="12" transform="rotate(30 5 225)" />
        <ellipse cx="10" cy="185" rx="4" ry="12" transform="rotate(30 10 185)" />
        <ellipse cx="-10" cy="185" rx="4" ry="12" transform="rotate(-30 -10 185)" />
        <ellipse cx="0" cy="145" rx="4" ry="12" transform="rotate(-30 0 145)" />
        <ellipse cx="15" cy="145" rx="4" ry="12" transform="rotate(30 15 145)" />
        <ellipse cx="5" cy="105" rx="3" ry="10" transform="rotate(30 5 105)" />
        <ellipse cx="-5" cy="105" rx="3" ry="10" transform="rotate(-30 -5 105)" />
      </g>
      
      {/* Soil base mound */}
      <ellipse cx="0" cy="260" rx="20" ry="5" fill="#c2a87d" />
    </motion.svg>
  )
}
