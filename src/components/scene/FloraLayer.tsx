import { motion, AnimatePresence } from 'framer-motion'
import type { OasisElement, GrowthStage } from '@/types/oasis.types'
import type { PreviewElement } from '@/hooks/useTimer'
import { Sprout } from './elements/Sprout'
import { Flower } from './elements/Flower'
import { Reed } from './elements/Reed'
import { Lantern } from './elements/Lantern'
import { Lily } from './elements/Lily'
import { Firefly } from './elements/Firefly'
import { DatePalm } from './elements/DatePalm'
import { Acacia } from './elements/Acacia'
import { Succulent } from './elements/Succulent'
import { DesertWillow } from './elements/DesertWillow'
import { MaturePalm } from './elements/MaturePalm'
import { MatureAcacia } from './elements/MatureAcacia'
import { MatureSucculent } from './elements/MatureSucculent'
import { MatureDesertWillow } from './elements/MatureDesertWillow'

interface FloraLayerProps {
  elements: OasisElement[]
  newElementId?: string | null
  preview?: PreviewElement | null
  previewProgress?: number // 0→1
}

function ElementComponent({ type, stage, seed }: { type: OasisElement['type']; stage: GrowthStage; seed: number }) {
  // For the 4 growing plant types, dispatch by stage
  if (stage === 'mature') {
    switch (type) {
      case 'palm':
        return <MaturePalm seed={seed} />
      case 'acacia':
        return <MatureAcacia />
      case 'succulent':
        return <MatureSucculent />
      case 'willow':
        return <MatureDesertWillow />
    }
  }
  // stage === 'sapling' (or non-growing types): use existing sapling components
  switch (type) {
    case 'palm':
      return <DatePalm />
    case 'acacia':
      return <Acacia />
    case 'succulent':
      return <Succulent />
    case 'willow':
      return <DesertWillow />
    case 'sprout':
      return <Sprout />
    case 'flower':
      return <Flower />
    case 'reed':
      return <Reed />
    case 'lantern':
      return <Lantern />
    case 'lily':
      return <Lily />
    case 'firefly':
      return <Firefly seed={seed} />
    default:
      return <DatePalm />
  }
}

export function FloraLayer({
  elements,
  newElementId,
  preview,
  previewProgress = 0,
}: FloraLayerProps) {
  // Preview opacity: 0.25 → 0.72 as session progresses
  const previewOpacity = 0.25 + previewProgress * 0.47
  // Preview scale: 0.45 → 0.95
  const previewScale = 0.45 + previewProgress * 0.5

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      {/* Planted elements */}
      <AnimatePresence>
        {elements.map((el, i) => {
          const isNew = el.id === newElementId
          return (
            <motion.div
              key={el.id}
              title={el.label}
              style={{
                position: 'absolute',
                left: `${el.position.x}%`,
                top: `${el.position.y}%`,
                transform: 'translate(-50%, -100%)',
              }}
              initial={isNew ? { scale: 0, opacity: 0, y: 20 } : { scale: 1, opacity: 1, y: 0 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={
                isNew
                  ? { type: 'spring', stiffness: 80, damping: 12, duration: 1.5 }
                  : { duration: 0 }
              }
            >
              <ElementComponent type={el.type} stage={el.stage} seed={i} />
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Preview element — ghost of what this session will earn */}
      <AnimatePresence>
        {preview && (
          <motion.div
            key="preview"
            className="growing-plant-glow"
            style={{
              position: 'absolute',
              left: `${preview.position.x}%`,
              top: `${preview.position.y}%`,
              transform: 'translate(-50%, -100%)',
            }}
            initial={{ scale: 0, opacity: 0, y: 16 }}
            animate={{ scale: previewScale, opacity: previewOpacity, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 8, transition: { duration: 0.4 } }}
            transition={{ type: 'spring', stiffness: 70, damping: 14, duration: 0.8 }}
          >
            {/* Render the specific sapling that is growing in this session */}
            <ElementComponent type={preview.type} stage="sapling" seed={99} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
