/* ==========================================================================
   SettingsStepper
   Reusable ◁ [value unit] ▷ pill-row primitive.
   Used by timer duration and sundial settings.
   ========================================================================== */

interface SettingsStepperProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  unit?: string
  disabled?: boolean
}

export function SettingsStepper({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = 'min',
  disabled = false,
}: SettingsStepperProps) {
  const decrement = () => onChange(Math.max(min, value - step))
  const increment = () => onChange(Math.min(max, value + step))

  const btnStyle: React.CSSProperties = {
    width: 28,
    height: 28,
    borderRadius: '50%',
    border: '1px solid var(--glass-border)',
    background: disabled ? 'transparent' : 'var(--glass-bg)',
    color: disabled ? 'rgba(245,230,200,0.3)' : 'var(--color-text-on-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '0.85rem',
    lineHeight: 1,
    flexShrink: 0,
    transition: 'background 150ms, color 150ms',
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        opacity: disabled ? 0.45 : 1,
        transition: 'opacity 200ms',
      }}
    >
      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--color-text-on-dark-muted)',
          flex: 1,
        }}
      >
        {label}
      </span>

      {/* Control pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255,252,245,0.06)',
          borderRadius: 999,
          padding: '4px 8px',
          border: '1px solid var(--glass-border)',
        }}
      >
        <button
          aria-label={`Decrease ${label}`}
          onClick={decrement}
          disabled={disabled || value <= min}
          style={{
            ...btnStyle,
            opacity: value <= min ? 0.3 : 1,
          }}
        >
          ◁
        </button>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            color: 'var(--color-text-on-dark)',
            minWidth: 52,
            textAlign: 'center',
          }}
        >
          {value} {unit}
        </span>

        <button
          aria-label={`Increase ${label}`}
          onClick={increment}
          disabled={disabled || value >= max}
          style={{
            ...btnStyle,
            opacity: value >= max ? 0.3 : 1,
          }}
        >
          ▷
        </button>
      </div>
    </div>
  )
}
