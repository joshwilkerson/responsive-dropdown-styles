import { getFullImageSrc } from "./background_image_pairs"
import { useResolvedColorMode } from "./utils/useResolvedColorMode"
import { useSelectedImagePair } from "./utils/useSelectedImagePair"

export function BackgroundImage() {
  const { resolvedColorMode } = useResolvedColorMode()
  const [selectedImagePair] = useSelectedImagePair()

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
            backgroundImage: `url("${getFullImageSrc(selectedImagePair[mode])}")`,
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
