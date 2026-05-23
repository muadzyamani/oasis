/* ==========================================================================
   NavigationRail
   Minimal vertical icon rail on the left edge.
   Houses: Stats, Settings.
   onSettingsClick and isSettingsActive are wired from App.tsx.
   ========================================================================== */

interface NavItem {
  id: string
  label: string
  icon: string // SVG path or emoji placeholder for Phase 1
  onClick: () => void
}

interface NavigationRailProps {
  onStatsClick?: () => void
  onSettingsClick?: () => void
  isSettingsActive?: boolean
  isStatsActive?: boolean
}

export function NavigationRail({
  onStatsClick,
  onSettingsClick,
  isSettingsActive,
  isStatsActive,
}: NavigationRailProps) {
  const items: NavItem[] = [
    {
      id: 'stats',
      label: 'Statistics',
      icon: '◈',
      onClick: onStatsClick ?? (() => {}),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '◎',
      onClick: onSettingsClick ?? (() => {}),
    },
  ]

  return (
    <nav
      className="absolute left-0 top-0 h-full flex flex-col items-center justify-center gap-6 px-4"
      style={{ zIndex: 'var(--z-nav)' }}
      aria-label="Main navigation"
    >
      {items.map((item) => {
        const isActive =
          (item.id === 'settings' && isSettingsActive) ||
          (item.id === 'stats' && isStatsActive)
        return (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            aria-label={item.label}
            aria-pressed={isActive}
            title={item.label}
            onClick={item.onClick}
            className="
              w-10 h-10 rounded-full flex items-center justify-center
              text-lg
              transition-all duration-300
              hover:scale-110
              focus-visible:outline-none
            "
            style={{
              background: isActive ? 'rgba(240,192,96,0.18)' : 'transparent',
              border: isActive ? '1px solid rgba(240,192,96,0.4)' : '1px solid transparent',
              color: isActive ? 'var(--color-lantern-gold)' : 'var(--color-text-on-dark)',
              transition: 'background 250ms, border 250ms, color 250ms, transform 150ms',
            }}
          >
            <span aria-hidden="true">{item.icon}</span>
          </button>
        )
      })}
    </nav>
  )
}
