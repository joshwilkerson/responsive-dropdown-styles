import { useEffect, useRef, useState } from "react"
import {
  applyColorMode,
  readStoredColorMode,
  LOCAL_STORAGE_KEY,
  type ColorMode,
} from "./colorMode"

export function useColorMode() {
  const [colorMode, setColorMode] = useState<ColorMode>(readStoredColorMode)
  const colorModeRef = useRef(colorMode)

  colorModeRef.current = colorMode

  useEffect(() => {
    applyColorMode(colorMode, document)
    localStorage.setItem(LOCAL_STORAGE_KEY, colorMode)

    document.querySelectorAll("iframe").forEach((frame) => {
      if (frame.contentDocument)
        applyColorMode(colorMode, frame.contentDocument)
    })
  }, [colorMode])

  useEffect(() => {
    const frames = [...document.querySelectorAll("iframe")].map((frame) => {
      const onLoad = () => {
        if (frame.contentDocument)
          applyColorMode(colorModeRef.current, frame.contentDocument)
      }
      frame.addEventListener("load", onLoad)
      return { frame, onLoad }
    })

    return () => {
      frames.forEach(({ frame, onLoad }) =>
        frame.removeEventListener("load", onLoad),
      )
    }
  }, [])

  return { colorMode, setColorMode }
}
