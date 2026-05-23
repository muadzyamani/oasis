import { motion } from 'framer-motion'

export function MatureAcacia() {
  return (
    <motion.svg
      width="140"
      height="220"
      viewBox="-50 0 100 270"
      fill="none"
      animate={{ rotate: [-0.6, 0.6, -0.6] }}
      transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      <ellipse cx="0" cy="258" rx="35" ry="6" fill="#c2a87d" opacity="0.6" />

      <path d="M 0 250 L -5 200 L -15 160" fill="none" stroke="#5a6a4a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M -5 200 L 10 160 L 25 140" fill="none" stroke="#5a6a4a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 0 250 L 5 210 L 20 180" fill="none" stroke="#5a6a4a" strokeWidth="6" strokeLinecap="round" />

      <g>
        <path d="M -40 140 Q 0 120 40 130 Q 60 140 50 150 Q 0 160 -40 150 Z" fill="#6a9c4a" />
        <path d="M -50 120 Q 0 100 50 110 Q 70 120 60 130 Q 0 140 -50 130 Z" fill="#7cb342" />
        <path d="M -45 100 Q 0 80 45 90 Q 60 100 50 110 Q 0 120 -45 110 Z" fill="#8bc34a" />
        <path d="M -30 85 Q 0 70 30 80 Q 40 90 30 100 Q 0 110 -30 100 Z" fill="#9acd32" />
        <path d="M -60 130 Q -20 140 0 135 Q 20 130 60 140 Q 70 150 40 155 Q 0 165 -40 155 Q -70 150 -60 130 Z" fill="#5a8c3a" />
      </g>

      <g stroke="#4a6a3a" strokeWidth="1.5" strokeLinecap="round">
        <line x1="-15" y1="160" x2="-25" y2="155" />
        <line x1="10" y1="160" x2="20" y2="155" />
        <line x1="5" y1="190" x2="-5" y2="185" />
        <line x1="-5" y1="180" x2="-12" y2="175" />
      </g>
    </motion.svg>
  )
}
