import { motion } from 'framer-motion'

export function MatureDesertWillow() {
  return (
    <motion.svg
      width="130"
      height="230"
      viewBox="-50 0 100 290"
      fill="none"
      animate={{ rotate: [-0.8, 0.8, -0.8] }}
      transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      <ellipse cx="0" cy="280" rx="30" ry="5" fill="#c2a87d" opacity="0.6" />

      <path d="M 0 280 Q -5 200 5 120" fill="none" stroke="#6a6a5a" strokeWidth="6" strokeLinecap="round" />
      <path d="M 0 280 Q 15 220 30 140" fill="none" stroke="#6a6a5a" strokeWidth="4" strokeLinecap="round" />
      <path d="M 5 120 Q -15 80 -25 50" fill="none" stroke="#6a6a5a" strokeWidth="3" strokeLinecap="round" />
      <path d="M 5 120 Q 25 95 40 65" fill="none" stroke="#6a6a5a" strokeWidth="3" strokeLinecap="round" />
      <path d="M 30 140 Q 12 105 5 75" fill="none" stroke="#6a6a5a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 30 140 Q 50 110 60 80" fill="none" stroke="#6a6a5a" strokeWidth="2.5" strokeLinecap="round" />

      <g fill="#8aaa8a">
        <ellipse cx="-25" cy="55" rx="10" ry="18" transform="rotate(-15 -25 55)" />
        <ellipse cx="40" cy="70" rx="9" ry="16" transform="rotate(15 40 70)" />
        <ellipse cx="5" cy="80" rx="10" ry="20" transform="rotate(0 5 80)" />
        <ellipse cx="60" cy="85" rx="8" ry="14" transform="rotate(10 60 85)" />
        <ellipse cx="-15" cy="100" rx="9" ry="16" transform="rotate(-20 -15 100)" />
        <ellipse cx="20" cy="105" rx="11" ry="18" transform="rotate(20 20 105)" />
        <ellipse cx="-35" cy="85" rx="7" ry="13" transform="rotate(-25 -35 85)" />
        <ellipse cx="50" cy="115" rx="8" ry="14" transform="rotate(15 50 115)" />
        <ellipse cx="-20" cy="125" rx="9" ry="15" transform="rotate(-10 -20 125)" />
        <ellipse cx="35" cy="135" rx="10" ry="17" transform="rotate(25 35 135)" />
      </g>

      <g fill="#e68a9f">
        <circle cx="-30" cy="50" r="2" />
        <circle cx="-20" cy="65" r="2" />
        <circle cx="-25" cy="75" r="2" />
        <circle cx="35" cy="65" r="2" />
        <circle cx="45" cy="80" r="2" />
        <circle cx="40" cy="60" r="2" />
        <circle cx="0" cy="70" r="2.5" />
        <circle cx="10" cy="85" r="2" />
        <circle cx="-5" cy="95" r="2" />
        <circle cx="60" cy="80" r="2" />
        <circle cx="55" cy="95" r="2" />
        <circle cx="-20" cy="95" r="2" />
        <circle cx="-30" cy="110" r="2" />
        <circle cx="15" cy="95" r="2" />
        <circle cx="25" cy="110" r="2.5" />
        <circle cx="45" cy="110" r="2" />
        <circle cx="55" cy="125" r="2" />
        <circle cx="-25" cy="120" r="2" />
        <circle cx="30" cy="130" r="2.5" />
      </g>
    </motion.svg>
  )
}
