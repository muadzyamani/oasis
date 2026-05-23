import { motion, AnimatePresence } from 'framer-motion'
import type { OasisElement } from '@/types/oasis.types'
import type { PreviewElement } from '@/hooks/useTimer'
import { Sprout } from './elements/Sprout'
import { Flower } from './elements/Flower'
import { Reed } from './elements/Reed'
import { Palm } from './elements/Palm'
import { Lantern } from './elements/Lantern'
import { Lily } from './elements/Lily'
import { Firefly } from './elements/Firefly'

interface FloraLayerProps {
  elements: OasisElement[]
  newElementId?: string | null
  preview?: PreviewElement | null
  previewProgress?: number // 0→1
}

function ElementComponent({ type, seed }: { type: OasisElement['type']; seed: number }) {
  switch (type) {
    case 'sprout':
      return <Sprout />
    case 'flower':
      return <Flower />
    case 'reed':
      return <Reed />
    case 'palm':
      return <Palm seed={seed} />
    case 'lantern':
      return <Lantern />
    case 'lily':
      return <Lily />
    case 'firefly':
      return <Firefly seed={seed} />
    default:
      return <Sprout />
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
              <ElementComponent type={el.type} seed={i} />
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Preview element — ghost of what this session will earn */}
      <AnimatePresence>
        {preview && (
          <motion.div
            key="preview"
            style={{
              position: 'absolute',
              left: `${preview.position.x}%`,
              top: `${preview.position.y}%`,
              transform: 'translate(-50%, -100%)',
              filter: 'saturate(0.6)',
            }}
            initial={{ scale: 0, opacity: 0, y: 16 }}
            animate={{ scale: previewScale, opacity: previewOpacity, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 8, transition: { duration: 0.4 } }}
            transition={{ type: 'spring', stiffness: 70, damping: 14, duration: 0.8 }}
          >
            {/* Always show the sprout sapling as the focus preview */}
            <ElementComponent type="sprout" seed={99} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
