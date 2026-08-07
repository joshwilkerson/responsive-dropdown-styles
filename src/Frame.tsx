import styles from "./Frame.module.css"
import type { PreviewComponent } from "./preview-components"

/**
 * Puts one preview component in an iframe at a fixed width.
 *
 * The iframe is load-bearing: Tapestry's responsive styles key off
 * `@media (max-width: 599px)`, so each variant needs a real viewport of its own
 * for those breakpoints to fire at the frame's width rather than the browser
 * window's. A sized `div` would resolve every media query against the window and
 * make all the frames look alike.
 *
 * Config crosses the iframe boundary as query params, read back by
 * preview.tsx.
 */
export const Frame = ({
  component,
  width,
  label,
  supportsLiquidGlass = false,
}: {
  component: PreviewComponent
  width: number
  label: string
  supportsLiquidGlass?: boolean
}) => {
  const params = new URLSearchParams({
    component,
    supportsLiquidGlass: String(supportsLiquidGlass),
  })

  return (
    <div className={styles.frame}>
      <p className={styles.label}>
        {label} <span>({width}px)</span>
      </p>
      <div className={styles.wrapper} style={{ width }}>
        <iframe
          src={`${import.meta.env.BASE_URL}preview.html?${params}`}
          title={label}
        />
      </div>
    </div>
  )
}
