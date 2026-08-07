import { useEffect, useState } from "react"
import {
  darkModeMediaQuery,
  colorModeAttribute,
  type ResolvedColorMode,
} from "./colorMode"

function readResolvedColorMode(): ResolvedColorMode {
  const attribute = document.documentElement.getAttribute(colorModeAttribute)
  if (attribute === "light" || attribute === "dark") return attribute

  return window.matchMedia(darkModeMediaQuery).matches ? "dark" : "light"
}

export function useResolvedColorMode(): {
  resolvedColorMode: ResolvedColorMode
} {
  const [resolvedColorMode, setResolvedColorMode] = useState<ResolvedColorMode>(
    readResolvedColorMode,
  )

  useEffect(() => {
    const updateColorMode = () => setResolvedColorMode(readResolvedColorMode())

    const mediaQuery = window.matchMedia(darkModeMediaQuery)
    mediaQuery.addEventListener("change", updateColorMode)

    const observer = new MutationObserver(updateColorMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [colorModeAttribute],
    })

    return () => {
      mediaQuery.removeEventListener("change", updateColorMode)
      observer.disconnect()
    }
  }, [])

  return { resolvedColorMode }
}
