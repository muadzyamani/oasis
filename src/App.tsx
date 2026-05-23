import { useState, useCallback } from 'react'
import { AppShell } from '@/components/ui/AppShell'
import { OasisScene } from '@/components/scene/OasisScene'
import { NavigationRail } from '@/components/ui/NavigationRail'
import { TimerWidget } from '@/components/timer/TimerWidget'
import { SettingsPanel } from '@/components/overlays/SettingsPanel'
import { useAmbient } from '@/hooks/useAmbient'
import { useOasisGrowth } from '@/hooks/useOasisGrowth'
import { TimeDebugPanel } from '@/components/dev/TimeDebugPanel'
import type { PreviewElement } from '@/hooks/useTimer'

/* ==========================================================================
   App Root — Phase 2
   TimerWidget manages two modes: expanded (idle) ↔ compact bar (active).
   Preview element flows from TimerWidget → OasisScene → FloraLayer.
   ========================================================================== */

function App() {
  const atmosphere = useAmbient()
  const { oasis } = useOasisGrowth()

  const [preview, setPreview] = useState<PreviewElement | null>(null)
  const [previewProgress, setPreviewProgress] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handlePreviewChange = useCallback((el: PreviewElement | null, progress: number) => {
    setPreview(el)
    setPreviewProgress(progress)
  }, [])

  return (
    <AppShell>
      {/* Layer 0 — Living animated scene */}
      <OasisScene
        atmosphere={atmosphere}
        oasis={oasis}
        preview={preview}
        previewProgress={previewProgress}
      />

      {/* Layer 1 — Timer widget (expanded card or compact bar) */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
          settingsOpen ? 'max-md:opacity-0 max-md:scale-95' : 'opacity-100 scale-100'
        }`}
        style={{ zIndex: 'var(--z-widget)' }}
      >
        <div className={`pointer-events-auto ${settingsOpen ? 'max-md:pointer-events-none' : ''}`}>
          <TimerWidget onPreviewChange={handlePreviewChange} />
        </div>
      </div>

      {/* Layer 2 — Navigation rail */}
      <NavigationRail
        onSettingsClick={() => setSettingsOpen((v) => !v)}
        isSettingsActive={settingsOpen}
      />

      {/* Layer 3 — Settings overlay */}
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Layer 4 — Dev tools (stripped from production bundle) */}
      {import.meta.env.DEV && <TimeDebugPanel />}
    </AppShell>
  )
}

export default App
