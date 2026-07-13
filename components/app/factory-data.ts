export type Factory = {
  id: string
  name: string
}

export const CHANNEL_COUNT = 300

export const INITIAL_FACTORIES: Factory[] = [
  { id: "north", name: "Северный завод" },
  { id: "west", name: "Западный завод" },
  { id: "center", name: "Центральный цех" },
  { id: "foundry", name: "Литейный завод" },
]

export type SpectrumPoint = {
  channel: number
  value: number
}

// Deterministic PRNG so every factory always renders the same spectrum.
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(value: string) {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

// Builds a synthetic spectrum-style signal across CHANNEL_COUNT channels.
// A soft baseline with a handful of Gaussian peaks reads like real instrument
// data and fills the plot area without needing any extra metrics.
export function generateSpectrum(id: string): SpectrumPoint[] {
  const random = mulberry32(hashString(id))

  const peakCount = 4 + Math.floor(random() * 4)
  const peaks = Array.from({ length: peakCount }, () => ({
    center: random() * CHANNEL_COUNT,
    width: 6 + random() * 22,
    height: 25 + random() * 75,
  }))

  const data: SpectrumPoint[] = []
  for (let channel = 0; channel < CHANNEL_COUNT; channel += 1) {
    let value = 6 + random() * 5
    for (const peak of peaks) {
      const distance = channel - peak.center
      value += peak.height * Math.exp(-(distance * distance) / (2 * peak.width * peak.width))
    }
    value += (random() - 0.5) * 3
    data.push({
      channel: channel + 1,
      value: Math.max(0, Number(value.toFixed(2))),
    })
  }

  return data
}
