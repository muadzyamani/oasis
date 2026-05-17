import type { AtmosphereState } from '@/types/growth.types'
import type { OasisState } from '@/types/oasis.types'
import type { PreviewElement } from '@/hooks/useTimer'
import { SkyLayer } from './SkyLayer'
import { WaterLayer } from './WaterLayer'
import { GroundLayer } from './GroundLayer'
import { FloraLayer } from './FloraLayer'
import { AtmosphereLayer } from './AtmosphereLayer'

interface OasisSceneProps {
  atmosphere: AtmosphereState
  oasis: OasisState
  newElementId?: string | null
  preview?: PreviewElement | null
  previewProgress?: number
}

export function OasisScene({ atmosphere, oasis, newElementId, preview, previewProgress }: OasisSceneProps) {
  const { timeOfDay, sessionActive, sessionProgress, isBreak } = atmosphere

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <SkyLayer timeOfDay={timeOfDay} />
      <GroundLayer timeOfDay={timeOfDay} />
      <WaterLayer timeOfDay={timeOfDay} sessionActive={sessionActive} tier={oasis.tier} />
      <FloraLayer
        elements={oasis.elements}
        newElementId={newElementId}
        preview={preview}
        previewProgress={previewProgress}
      />
      <AtmosphereLayer
        sessionActive={sessionActive}
        sessionProgress={sessionProgress}
        isBreak={isBreak}
      />
    </div>
  )
}
