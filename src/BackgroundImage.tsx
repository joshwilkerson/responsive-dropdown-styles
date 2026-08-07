import { useResolvedColorMode } from "./utils/useResolvedColorMode"

const SOURCES = {
  light:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?fm=jpg&q=60&w=800&fit=crop",
  dark: "https://images.unsplash.com/photo-1688494930098-e88c53c26e3a?fm=jpg&q=60&w=800&fit=crop",
} as const

export function BackgroundImage() {
  const { resolvedColorMode } = useResolvedColorMode()

  return (
    <>
      {(["light", "dark"] as const).map((mode) => (
        <div
          key={mode}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            backgroundImage: `url("${SOURCES[mode]}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: resolvedColorMode === mode ? 1 : 0,
            transition: "opacity 300ms ease",
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  )
}
