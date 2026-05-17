/* ==========================================================================
   SettingsToggle
   Reusable iOS-style animated pill toggle.
   ========================================================================== */

import { motion } from 'framer-motion'

interface SettingsToggleProps {
  label: string
  description?: string
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}

export function SettingsToggle({
  label,
  description,
  value,
  onChange,
  disabled = false,
}: SettingsToggleProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        opacity: disabled ? 0.45 : 1,
        transition: 'opacity 200ms',
      }}
    >
      {/* Label + optional description */}
      <div style={{ flex: 1 }}>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--color-text-on-dark-muted)',
            display: 'block',
          }}
        >
          {label}
        </span>
        {description && (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'rgba(245,230,200,0.45)',
              display: 'block',
              marginTop: 2,
            }}
          >
            {description}
          </span>
        )}
      </div>

      {/* Toggle pill */}
      <button
        role="switch"
        aria-checked={value}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!value)}
        style={{
          width: 44,
          height: 26,
          borderRadius: 999,
          border: '1px solid var(--glass-border)',
          background: value
            ? 'rgba(240,192,96,0.55)'
            : 'rgba(255,252,245,0.08)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          position: 'relative',
          flexShrink: 0,
          transition: 'background 250ms var(--ease-smooth)',
          padding: 0,
        }}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          style={{
            position: 'absolute',
            top: 3,
            left: value ? 'calc(100% - 22px)' : 3,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: value ? 'var(--color-lantern-gold)' : 'rgba(245,230,200,0.5)',
            boxShadow: value
              ? '0 1px 4px rgba(240,192,96,0.5)'
              : '0 1px 3px rgba(0,0,0,0.25)',
          }}
        />
      </button>
    </div>
  )
}
