import type { AtmosphereState } from '@/types/growth.types'
import type { OasisState } from '@/types/oasis.types'
import type { PreviewElement } from '@/hooks/useTimer'
import { SkyLayer } from './SkyLayer'
import { WaterLayer } from './WaterLayer'
import { GroundLayer } from './GroundLayer'
import { VegetationLayer } from './VegetationLayer'
import { FloraLayer } from './FloraLayer'
import { AtmosphereLayer } from './AtmosphereLayer'

interface OasisSceneProps {
  atmosphere: AtmosphereState
  oasis: OasisState
  newElementId?: string | null
  preview?: PreviewElement | null
  previewProgress?: number
}

export function OasisScene({
  atmosphere,
  oasis,
  newElementId,
  preview,
  previewProgress,
}: OasisSceneProps) {
  const { timeOfDay, sessionActive, sessionProgress, isBreak } = atmosphere

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    >
      {/* Layer 1: Continuous sky — sun arc, moon phase, stars */}
      <SkyLayer atmosphere={atmosphere} />

      {/* Layer 2: Ground (still uses 5-bucket timeOfDay for colour) */}
      <GroundLayer timeOfDay={timeOfDay} />

      {/* Layer 3: Water pool */}
      <WaterLayer timeOfDay={timeOfDay} sessionActive={sessionActive} tier={oasis.tier} />

      {/* Layer 3b: Baseline decorative vegetation (grass, bushes, rocks, reeds, lilies) */}
      <VegetationLayer />

      {/* Layer 4: Flora elements */}
      <FloraLayer
        elements={oasis.elements}
        newElementId={newElementId}
        preview={preview}
        previewProgress={previewProgress}
      />

      {/* Layer 5: Atmosphere (dust, focus glow, particles) */}
      <AtmosphereLayer
        sessionActive={sessionActive}
        sessionProgress={sessionProgress}
        isBreak={isBreak}
      />
    </div>
  )
}
