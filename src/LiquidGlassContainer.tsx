import { useState, type ReactNode } from "react"
import { UNSAFE_PortalProvider } from "react-aria"

import { BackgroundImage } from "./BackgroundImage"

const backdropStyle = {
  position: "absolute",
  inset: "calc(-1 * var(--t-spacing-3))",
  padding: "var(--t-spacing-3)",
  boxSizing: "border-box",
  isolation: "isolate",
} as const

export const LiquidGlassContainer = ({ children }: { children: ReactNode }) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  return (
    <div data-supports-liquid-glass style={backdropStyle} ref={setContainer}>
      <BackgroundImage />
      {container && (
        <UNSAFE_PortalProvider getContainer={() => container}>
          {children}
        </UNSAFE_PortalProvider>
      )}
    </div>
  )
}
