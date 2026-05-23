import type { ReactNode } from 'react'

/* ==========================================================================
   AppShell
   The root layout container. Manages the fullscreen layered architecture:
     Layer 0 (z-scene):   OasisScene — the living environment
     Layer 1 (z-widget):  TimerWidget — floating center UI
     Layer 2 (z-nav):     NavigationRail — icon sidebar
     Layer 3 (z-overlay): Active overlay panels (stats, settings)
   ========================================================================== */

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ isolation: 'isolate' }}>
      {children}
    </div>
  )
}
