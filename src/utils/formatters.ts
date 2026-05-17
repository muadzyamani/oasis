import type { OasisElementType } from '@/types/oasis.types'

/* ==========================================================================
   Formatters — display helpers used across stores and components
   ========================================================================== */

const ELEMENT_NAMES: Record<OasisElementType, string> = {
  sprout: 'Sprout',
  flower: 'Flower',
  reed: 'Reed',
  palm: 'Palm',
  lantern: 'Lantern',
  lily: 'Lotus',
  waterfall: 'Falls',
  firefly: 'Firefly',
}

const ORDINAL_DAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const format = {
  /**
   * Creates a poetic label for an oasis element.
   * e.g. "The Reed of Monday, 12th May"
   */
  elementLabel: (type: OasisElementType, timestamp: number): string => {
    const d = new Date(timestamp)
    const dayName = ORDINAL_DAYS[d.getDay()]
    const dayNum = d.getDate()
    const monthName = MONTHS[d.getMonth()]
    const suffix =
      dayNum === 1 || dayNum === 21 || dayNum === 31
        ? 'st'
        : dayNum === 2 || dayNum === 22
          ? 'nd'
          : dayNum === 3 || dayNum === 23
            ? 'rd'
            : 'th'
    return `The ${ELEMENT_NAMES[type]} of ${dayName}, ${dayNum}${suffix} ${monthName}`
  },

  /**
   * Formats seconds into MM:SS display string.
   */
  countdown: (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  },

  /**
   * Formats total minutes into a human-readable duration.
   * e.g. 90 → "1h 30m", 25 → "25m"
   */
  duration: (totalMinutes: number): string => {
    if (totalMinutes < 60) return `${totalMinutes}m`
    const hours = Math.floor(totalMinutes / 60)
    const mins = totalMinutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  },

  /**
   * Formats a unix timestamp to a readable date.
   */
  date: (timestamp: number): string => {
    const d = new Date(timestamp)
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
  },
}
