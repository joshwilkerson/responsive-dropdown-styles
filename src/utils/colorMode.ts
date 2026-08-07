export const colorModeAttribute = "data-color-mode"
export const darkModeMediaQuery = "(prefers-color-scheme: dark)"

export const COLOR_MODES = [
  { id: "light", label: "Light", icon: "toolbar#sun" },
  { id: "dark", label: "Dark", icon: "toolbar#moon" },
  { id: "system", label: "System", icon: "toolbar#display" },
] as const

export type ColorMode = (typeof COLOR_MODES)[number]["id"]

export type ResolvedColorMode = Exclude<ColorMode, "system">

const DEFAULT_COLOR_MODE: ColorMode = "system"
export const LOCAL_STORAGE_KEY = "tapestry-dropdown-responsive-demo:color-mode"

export function getColorModeOption(mode: ColorMode) {
  return COLOR_MODES.find(({ id }) => id === mode) ?? COLOR_MODES[0]
}

function isColorMode(value: string | null): value is ColorMode {
  return COLOR_MODES.some(({ id }) => id === value)
}

export function readStoredColorMode(): ColorMode {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
  return isColorMode(stored) ? stored : DEFAULT_COLOR_MODE
}

export function applyColorMode(mode: ColorMode, doc: Document) {
  doc.documentElement.setAttribute(colorModeAttribute, mode)
}
