# Context: how these styles reach the browser

Shared background for both proposals. Neither makes sense without knowing how Planning Center app (PCA) renders Planning Center products, so this is the piece to read first.

## The rendering context

PCA is a React Native app that renders all the PCO products inside a `WebView`. From the web page's point of view it's an ordinary browser — but it's a browser with two things a normal one doesn't have:

1. A viewport that is always phone-sized.
2. A host app that knows things the page can't detect on its own, like whether the device supports iOS 26's Liquid Glass.

PCA bridges the second point by injecting attributes onto `<html>` when the WebView loads.

## The injected attributes

```js
// home-mobile/src/components/pca_webview.tsx
document.documentElement.setAttribute("data-app-context", "native")
document.documentElement.setAttribute(
  "data-color-mode",
  isDark ? "dark" : "light",
)
// only when the device supports it:
document.documentElement.setAttribute("data-supports-liquid-glass", "true")
```

Three things worth noting, because the CSS depends on all of them:

**They all land on the same element.** `data-color-mode` and `data-supports-liquid-glass` are both on `<html>`. Any CSS that needs to combine them cannot put a descendant combinator between them — see [the Liquid Glass doc](./liquid-glass.md) for how the selectors handle this.

**`data-supports-liquid-glass` is only ever set, never removed.** A device without support simply omits the attribute. There's no `"false"` value to handle.

**Capability is determined, not guessed:**

```ts
// home-mobile/src/utils/platform_select.ts
export const deviceSupportsLiquidGlass = () =>
  isLiquidGlassAvailable() && isGlassEffectAPIAvailable()
```

Both come from `expo-glass-effect`. This matters for the proposal: we aren't sniffing user agents or inferring from screen size. The host app asks the OS directly and passes the answer through.

## What this means for Tapestry

Outside a PCA WebView, `data-supports-liquid-glass` is absent, every Liquid Glass selector fails to match, and `Dropdown` renders exactly as it does today.

`data-color-mode` is already Tapestry's own convention — `tokens-dark.css` keys off `:root[data-color-mode="dark"]` — so PCA is feeding an existing mechanism rather than inventing one. The Liquid Glass styles follow the same convention for its own tokens.

## The contract

| Owner | Responsibility | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Tapestry** | Keep `[data-supports-liquid-glass]` styling working when `Dropdown`'s internals change. Internal class names are free to move as long as this CSS moves with them. |
| **Planning Center App** | Sets `data-supports-liquid-glass` and `data-color-mode` on `document.documentElement`. Don't rename or relocate them. |

More details on this division of responsibilities can be found in the [the Liquid Glass doc](./liquid-glass.md).

## Next

- [Width-based sizing for touch](./responsive-sizing.md)
- [Liquid Glass styles](./liquid-glass.md)
