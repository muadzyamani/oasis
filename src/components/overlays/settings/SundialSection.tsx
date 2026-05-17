/* ==========================================================================
   SundialSection
   Sunrise / sunset hour calibration for the celestial sky engine.
   Reads/writes settingsStore.
   ========================================================================== */

import { useSettingsStore } from '@/stores/settingsStore'
import { SettingsStepper } from '@/components/ui/SettingsStepper'
import { SectionHeading } from './TimerSection'

export function SundialSection() {
  const { sunriseHour, sunsetHour, setSunTimes } = useSettingsStore()

  return (
    <section>
      <SectionHeading>Sundial</SectionHeading>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'rgba(245,230,200,0.45)',
          marginBottom: 14,
          lineHeight: 1.5,
        }}
      >
        Calibrate sunrise and sunset to your location for accurate sky colours.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <SettingsStepper
          label="Sunrise"
          value={sunriseHour}
          onChange={(v) => setSunTimes(v, sunsetHour)}
          min={3}
          max={10}
          step={1}
          unit="h"
        />
        <SettingsStepper
          label="Sunset"
          value={sunsetHour}
          onChange={(v) => setSunTimes(sunriseHour, v)}
          min={16}
          max={22}
          step={1}
          unit="h"
        />
      </div>
    </section>
  )
}
