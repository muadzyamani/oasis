import { useState } from 'react'
import { useDevStore } from '@/stores/devStore'
import { useSettingsStore } from '@/stores/settingsStore'
import {
  computeSolarElevation,
  computeSunPosition,
  computeMoonPosition,
  computeStarsOpacity,
  getLunarPhase,
} from '@/engines/ambientEngine'

/* ==========================================================================
   TimeDebugPanel — DEV ONLY
   Floats in the bottom-right corner during development.
   Lets you scrub through any minute of the 24h cycle to test the sky system.
   Renders nothing in production.
   ========================================================================== */

function pad(n: number) {
  return String(Math.floor(n)).padStart(2, '0')
}
function minutesToHHMM(m: number) {
  return `${pad(m / 60)}:${pad(m % 60)}`
}

const PHASE_LABELS = [
  '🌑 New',
  '🌒 Waxing crescent',
  '🌓 First quarter',
  '🌔 Waxing gibbous',
  '🌕 Full',
  '🌖 Waning gibbous',
  '🌗 Last quarter',
  '🌘 Waning crescent',
]
function phaseLabel(p: number) {
  return PHASE_LABELS[Math.round(p * 8) % 8]
}

export function TimeDebugPanel() {
  const { timeOverride, setTimeOverride, clearTimeOverride } = useDevStore()
  const { sunriseHour, sunsetHour } = useSettingsStore()
  const [collapsed, setCollapsed] = useState(false)

  const currentMinute = timeOverride
    ? timeOverride.hour * 60 + timeOverride.minute
    : new Date().getHours() * 60 + new Date().getMinutes()

  const sr = sunriseHour * 60
  const ss = sunsetHour * 60
  const elev = computeSolarElevation(currentMinute, sr, ss)
  const sunPos = computeSunPosition(currentMinute, sr, ss)
  const moonPos = computeMoonPosition(currentMinute, sr, ss)
  const stars = computeStarsOpacity(elev)
  const lunarPhase = getLunarPhase(new Date())

  const isOverriding = timeOverride !== null

  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 100,
    right: 16,
    zIndex: 9999,
    fontFamily: 'ui-monospace, "Cascadia Code", "Fira Code", monospace',
    fontSize: 11,
    background: 'rgba(8, 12, 20, 0.92)',
    border: `1px solid ${isOverriding ? 'rgba(240,192,96,0.6)' : 'rgba(255,255,255,0.12)'}`,
    borderRadius: 12,
    backdropFilter: 'blur(12px)',
    color: '#c8d4e0',
    width: collapsed ? 'auto' : 240,
    boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
    overflow: 'hidden',
    userSelect: 'none',
  }

  return (
    <div style={baseStyle}>
      {/* Header */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: collapsed ? '7px 12px' : '8px 12px 6px',
          cursor: 'pointer',
          borderBottom: collapsed ? 'none' : '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <span style={{ fontSize: 13 }}>🕐</span>
        <span
          style={{
            fontWeight: 600,
            color: isOverriding ? '#f0c060' : '#8ab4cc',
            letterSpacing: '0.04em',
          }}
        >
          {isOverriding ? '⏱ TIME OVERRIDE' : 'Sky Debug'}
        </span>
        {!collapsed && <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: 10 }}>▼</span>}
        {collapsed && <span style={{ marginLeft: 4, opacity: 0.4, fontSize: 10 }}>▶</span>}
      </div>

      {!collapsed && (
        <div style={{ padding: '10px 12px 12px' }}>
          {/* Current time display */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: isOverriding ? '#f0c060' : '#ffffff',
                letterSpacing: '-0.03em',
              }}
            >
              {minutesToHHMM(currentMinute)}
            </span>
            <span style={{ opacity: 0.5, fontSize: 10 }}>
              {isOverriding ? 'overridden' : 'real clock'}
            </span>
          </div>

          {/* Slider */}
          <input
            type="range"
            min={0}
            max={1439}
            value={currentMinute}
            onChange={(e) => {
              const m = Number(e.target.value)
              setTimeOverride(Math.floor(m / 60), m % 60)
            }}
            style={{ width: '100%', accentColor: '#f0c060', marginBottom: 10, cursor: 'pointer' }}
          />

          {/* Quick-jump buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
            {[
              { label: 'Dawn', min: 360 },
              { label: 'Sunrise', min: 420 },
              { label: 'Noon', min: 780 },
              { label: 'Sunset', min: 1140 },
              { label: 'Night', min: 1260 },
              { label: '1am', min: 60 },
            ].map(({ label, min }) => (
              <button
                key={label}
                onClick={() => setTimeOverride(Math.floor(min / 60), min % 60)}
                style={{
                  fontSize: 10,
                  padding: '3px 7px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  background:
                    currentMinute === min ? 'rgba(240,192,96,0.25)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${currentMinute === min ? 'rgba(240,192,96,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  color: currentMinute === min ? '#f0c060' : '#8ab4cc',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Computed values */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              marginBottom: 10,
              opacity: 0.8,
            }}
          >
            <Row
              k="Elevation"
              v={`${(elev * 100).toFixed(1)}%  ${elev > 0 ? '☀︎ day' : '🌙 night'}`}
              highlight={elev > 0}
            />
            <Row
              k="Sun pos"
              v={sunPos ? `x:${sunPos.x.toFixed(1)}% y:${sunPos.y.toFixed(1)}%` : '— below horizon'}
            />
            <Row
              k="Moon pos"
              v={
                moonPos
                  ? `x:${moonPos.x.toFixed(1)}% y:${moonPos.y.toFixed(1)}%`
                  : '— below horizon'
              }
            />
            <Row k="Stars" v={`${(stars * 100).toFixed(0)}% visible`} />
            <Row k="Lunar" v={`${phaseLabel(lunarPhase)}  (${(lunarPhase * 100).toFixed(1)}%)`} />
            <Row k="Sunrise" v={`${pad(sunriseHour)}:00`} />
            <Row k="Sunset" v={`${pad(sunsetHour)}:00`} />
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={clearTimeOverride}
              disabled={!isOverriding}
              style={{
                flex: 1,
                fontSize: 10,
                padding: '5px 0',
                borderRadius: 6,
                cursor: isOverriding ? 'pointer' : 'default',
                background: isOverriding ? 'rgba(240,192,96,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isOverriding ? 'rgba(240,192,96,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: isOverriding ? '#f0c060' : 'rgba(255,255,255,0.3)',
              }}
            >
              ↩ Use real clock
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
      <span style={{ opacity: 0.5, flexShrink: 0 }}>{k}</span>
      <span
        style={{
          color: highlight ? '#a8d4a0' : '#c8d4e0',
          textAlign: 'right',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {v}
      </span>
    </div>
  )
}
