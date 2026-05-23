import { motion } from 'framer-motion'

/* ─── Grass Tuft Component ─── */
function GrassTuft() {
  return (
    <motion.svg
      width="20"
      height="24"
      viewBox="0 0 25 30"
      fill="none"
      stroke="#558B2F"
      strokeWidth="2"
      strokeLinecap="round"
      animate={{ skewX: [-2.5, 2.5, -2.5] }}
      transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      <path d="M15 30 Q10 10 5 0" />
      <path d="M18 30 Q23 8 28 -2" />
      <path d="M16 30 Q11 14 8 5" stroke="#689F38" />
    </motion.svg>
  )
}

/* ─── Low Bush Component ─── */
function LowBush({ type }: { type: 'pink' | 'yellow' }) {
  const fruitColor = type === 'pink' ? '#E91E63' : '#FFC107'
  return (
    <motion.svg
      width="48"
      height="24"
      viewBox="0 0 60 30"
      fill="none"
      animate={{ scaleY: [0.97, 1.03, 0.97] }}
      transition={{ repeat: Infinity, duration: 5.4, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      <ellipse cx="30" cy="20" rx="30" ry="15" fill="#4CAF50" opacity="0.8" />
      <ellipse cx="25" cy="15" rx="23" ry="11" fill="#66BB6A" opacity="0.9" />
      <circle cx="20" cy="13" r="2.5" fill={fruitColor} opacity="0.8" />
      <circle cx="32" cy="11" r="2" fill={fruitColor} opacity="0.8" />
    </motion.svg>
  )
}

/* ─── Small Rocks Component ─── */
function SmallRocks() {
  return (
    <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
      <ellipse cx="6" cy="7" rx="6" ry="3" fill="#9E9E9E" opacity="0.7" />
      <ellipse cx="11" cy="6" rx="4" ry="2" fill="#BDBDBD" opacity="0.7" />
    </svg>
  )
}

/* ─── Reed Cluster Component ─── */
function ReedCluster() {
  return (
    <motion.svg
      width="30"
      height="90"
      viewBox="0 0 50 150"
      fill="none"
      animate={{ rotate: [-1.5, 1.5, -1.5] }}
      transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      <path d="M25 150 Q23 85 20 15" stroke="#558B2F" strokeWidth="2.5" />
      <path d="M40 150 Q42 87 45 23" stroke="#689F38" strokeWidth="2.5" />
      <path d="M10 150 Q5 85 0 20" stroke="#558B2F" strokeWidth="2" />
      <g fill="#7CB342" opacity="0.9">
        <ellipse cx="20" cy="13" rx="12" ry="8" />
        <ellipse cx="20" cy="7" rx="15" ry="5" />
        <ellipse cx="45" cy="21" rx="13" ry="8" />
        <ellipse cx="45" cy="15" rx="16" ry="5" />
        <ellipse cx="0" cy="18" rx="11" ry="7" />
        <ellipse cx="0" cy="13" rx="13" ry="5" />
      </g>
      <g stroke="#8BC34A" strokeWidth="0.7" opacity="0.8">
        <path d="M20 5 L10 -3" />
        <path d="M20 5 L15 -5" />
        <path d="M20 5 L25 -5" />
        <path d="M20 5 L30 -3" />
        <path d="M45 13 L35 5" />
        <path d="M45 13 L40 3" />
        <path d="M45 13 L50 3" />
        <path d="M45 13 L55 5" />
      </g>
    </motion.svg>
  )
}

/* ─── Cattail Component ─── */
function Cattail() {
  return (
    <motion.svg
      width="24"
      height="96"
      viewBox="0 0 40 160"
      fill="none"
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ repeat: Infinity, duration: 5.0, ease: 'easeInOut' }}
      style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
    >
      <path d="M20 160 Q18 90 15 15" stroke="#558B2F" strokeWidth="2" />
      <ellipse cx="15" cy="25" rx="5" ry="18" fill="#5D4037" />
      <ellipse cx="15" cy="25" rx="4" ry="16" fill="#6D4C41" />
      <path d="M15 7 L15 -2" stroke="#8BC34A" strokeWidth="1.5" />
      <path d="M18 105 Q0 80 -15 73" stroke="#558B2F" strokeWidth="2" />
    </motion.svg>
  )
}

/* ─── Water Lily Component ─── */
function WaterLily() {
  return (
    <motion.svg
      width="20"
      height="12"
      viewBox="0 0 25 15"
      fill="none"
      animate={{ y: [-1, 1, -1] }}
      transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
      style={{ overflow: 'visible' }}
    >
      <ellipse cx="12" cy="10" rx="12" ry="6" fill="#2E7D32" opacity="0.8" />
      <path d="M12 10 L12 5" stroke="#0277BD" strokeWidth="1.5" />
      <circle cx="17" cy="8" r="3" fill="#FFFFFF" opacity="0.95" />
      <circle cx="17" cy="8" r="1.5" fill="#FFEB3B" />
    </motion.svg>
  )
}

/* ─── Fallen Date Component ─── */
function FallenDate() {
  return (
    <svg width="6" height="8" viewBox="0 0 6 8" fill="none">
      <ellipse cx="3" cy="4" rx="3" ry="4" fill="#8B4513" opacity="0.8" />
    </svg>
  )
}

export function VegetationLayer() {
  // Static layout mapping shifted down by 8% to align with lowered horizon
  const elements = [
    // Grass Tufts
    { key: 'grass-1', comp: <GrassTuft />, x: 21, y: 80 },
    { key: 'grass-2', comp: <GrassTuft />, x: 43, y: 81 },
    { key: 'grass-3', comp: <GrassTuft />, x: 62, y: 80 },

    // Low Bushes
    { key: 'bush-1', comp: <LowBush type="pink" />, x: 14, y: 82 },
    { key: 'bush-2', comp: <LowBush type="yellow" />, x: 70, y: 81 },

    // Small Rocks
    { key: 'rock-1', comp: <SmallRocks />, x: 30, y: 81 },
    { key: 'rock-2', comp: <SmallRocks />, x: 55, y: 82 },

    // Reeds
    { key: 'reed-left', comp: <ReedCluster />, x: 25, y: 75 },
    { key: 'reed-right', comp: <ReedCluster />, x: 58, y: 75 },

    // Cattails
    { key: 'cattail-left', comp: <Cattail />, x: 32, y: 74 },
    { key: 'cattail-right', comp: <Cattail />, x: 50, y: 74 },

    // Water Lilies
    { key: 'lily-1', comp: <WaterLily />, x: 38, y: 71 },
    { key: 'lily-2', comp: <WaterLily />, x: 48, y: 72 },
    { key: 'lily-3', comp: <WaterLily />, x: 43, y: 73 },

    // Fallen Dates
    { key: 'date-1', comp: <FallenDate />, x: 41, y: 80 },
    { key: 'date-2', comp: <FallenDate />, x: 42.5, y: 80.5 },
    { key: 'date-3', comp: <FallenDate />, x: 36, y: 80 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      {elements.map((el) => (
        <div
          key={el.key}
          style={{
            position: 'absolute',
            left: `${el.x}%`,
            top: `${el.y}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {el.comp}
        </div>
      ))}
    </div>
  )
}
