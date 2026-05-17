/* ==========================================================================
   NavigationRail
   Minimal vertical icon rail on the left edge.
   Houses: Stats, Settings (Phase 2: more panels).
   Placeholder click handlers — wired in Phase 2.
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
}

export function NavigationRail({ onStatsClick, onSettingsClick }: NavigationRailProps) {
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
      {items.map((item) => (
        <button
          key={item.id}
          id={`nav-${item.id}`}
          aria-label={item.label}
          title={item.label}
          onClick={item.onClick}
          className="
            w-10 h-10 rounded-full flex items-center justify-center
            text-[var(--color-text-on-dark-muted)] text-lg
            transition-all duration-300
            hover:text-[var(--color-lantern-gold)]
            hover:bg-[var(--glass-bg)]
            hover:scale-110
            focus-visible:outline-none
          "
          style={{
            backdropFilter: 'var(--glass-blur)',
          }}
        >
          <span aria-hidden="true">{item.icon}</span>
        </button>
      ))}
    </nav>
  )
}
