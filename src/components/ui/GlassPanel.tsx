import type { ReactNode, CSSProperties, ElementType } from 'react'

/* ==========================================================================
   GlassPanel
   Reusable glassmorphism surface primitive.
   Used by all overlays, widgets, and floating UI elements.
   ========================================================================== */

interface GlassPanelProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  dark?: boolean
  as?: ElementType
  onClick?: () => void
}

export function GlassPanel({
  children,
  className = '',
  style,
  dark = false,
  as: Tag = 'div',
  onClick,
}: GlassPanelProps) {
  const Component = Tag as ElementType
  return (
    <Component
      className={`${dark ? 'glass-panel-dark' : 'glass-panel'} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </Component>
  )
}
