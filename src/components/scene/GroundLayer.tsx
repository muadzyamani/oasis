import type { TimeOfDay } from '@/types/growth.types'
import { SCENE_COLORS } from '@/engines/ambientEngine'

interface GroundLayerProps {
  timeOfDay: TimeOfDay
}

export function GroundLayer({ timeOfDay }: GroundLayerProps) {
  const colors = SCENE_COLORS[timeOfDay]

  return (
    <>
      {/* Far dune silhouettes */}
      <div className="absolute left-0 right-0" style={{ bottom: '22%', zIndex: 2, marginBottom: -1 }}>
        <svg
          viewBox="0 0 900 120" preserveAspectRatio="none"
          style={{ width: '100%', height: 120, display: 'block' }}
        >
          {/* Layered background sand dunes modeled exactly from the mockup */}
          <ellipse
            cx="200" cy="90" rx="280" ry="45"
            fill={colors.groundFar}
            fillOpacity="0.7"
            style={{ transition: 'fill 4s ease-in-out' }}
          />
          <ellipse
            cx="650" cy="85" rx="240" ry="40"
            fill={colors.groundFar}
            fillOpacity="0.7"
            style={{ transition: 'fill 4s ease-in-out' }}
          />
          <ellipse
            cx="450" cy="95" rx="200" ry="35"
            fill={colors.groundFar}
            fillOpacity="0.6"
            style={{ transition: 'fill 4s ease-in-out' }}
          />
        </svg>
      </div>

      {/* Near ground plane */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{
          height: '22%',
          zIndex: 4,
          backgroundColor: colors.groundColor,
          transition: 'background-color 4s ease-in-out',
        }}
      />

      {/* Ground-sky blend at top of ground */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: '22%',
          height: 40,
          zIndex: 4,
          background: `linear-gradient(to bottom, transparent, ${colors.groundColor})`,
          transition: 'background 4s ease-in-out',
        }}
      />
    </>
  )
}
