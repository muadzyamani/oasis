import { motion } from 'framer-motion'

export function MatureSucculent() {
  return (
    <motion.svg
      width="130"
      height="230"
      viewBox="-50 0 100 310"
      fill="none"
      animate={{ scaleY: [0.99, 1.01, 0.99] }}
      transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      <ellipse cx="0" cy="300" rx="35" ry="5" fill="#c2a87d" opacity="0.6" />

      <g fill="#5a7c69">
        <path d="M 0 260 Q -50 280 -65 240 Q -35 220 -5 230 Z" />
        <path d="M 0 260 Q 50 270 65 230 Q 35 210 5 230 Z" />
        <path d="M 0 260 Q -55 240 -45 190 Q -15 180 0 210 Z" />
        <path d="M 0 260 Q 55 230 45 180 Q 15 170 0 210 Z" />
      </g>

      <g fill="#6a8c79">
        <path d="M 0 240 Q -30 250 -35 210 Q -5 190 5 210 Z" />
        <path d="M 0 240 Q 30 240 35 200 Q 10 180 5 210 Z" />
        <path d="M 0 240 Q -35 210 -25 160 Q 0 140 5 190 Z" />
        <path d="M 0 240 Q 35 200 30 150 Q 10 130 5 190 Z" />
        <path d="M 0 240 Q -5 200 0 140 Q 10 130 10 180 Z" />
      </g>

      <g fill="#7a9c89">
        <path d="M 0 220 Q -15 230 -18 190 Q 0 170 5 190 Z" />
        <path d="M 0 220 Q 15 220 18 180 Q 5 160 5 190 Z" />
        <path d="M 0 220 Q -2 180 2 140 Q 8 130 8 170 Z" />
      </g>

      <path d="M 0 220 Q 2 140 0 80" fill="none" stroke="#8a6a5a" strokeWidth="4" strokeLinecap="round" />

      <g fill="#9a8a7a">
        <path d="M 0 200 Q 5 190 2 180 Q 0 175 0 185 Z" />
        <path d="M 0 200 Q -5 190 -2 180 Q 0 175 0 185 Z" />
        <path d="M 1 160 Q 6 150 3 140 Q 1 135 1 145 Z" />
        <path d="M 1 160 Q -4 150 -1 140 Q 1 135 1 145 Z" />
      </g>

      <g fill="#e6a817">
        <circle cx="0" cy="80" r="5" />
        <circle cx="-5" cy="90" r="4" />
        <circle cx="5" cy="90" r="4" />
        <circle cx="-2" cy="100" r="4" />
        <circle cx="2" cy="110" r="3" />
        <circle cx="-7" cy="115" r="3" />
        <circle cx="7" cy="115" r="3" />
        <circle cx="-3" cy="125" r="3" />
        <circle cx="3" cy="125" r="3" />
      </g>

      <g stroke="#a0c0a0" strokeWidth="1" strokeLinecap="round">
        <line x1="-60" y1="245" x2="-70" y2="250" />
        <line x1="60" y1="235" x2="70" y2="240" />
        <line x1="-40" y1="195" x2="-50" y2="200" />
        <line x1="40" y1="185" x2="50" y2="190" />
      </g>
    </motion.svg>
  )
}
