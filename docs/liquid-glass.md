# Liquid Glass styles

Read [context](./context.md) first — this proposal depends entirely on the attributes PCA injects.

This is the proposal that needs the most scrutiny. The styles admittedly look out of place in Tapestry, and the [ownership section](#why-these-styles-belong-in-tapestry) is the argument for why they belong there anyway.

## What changes

iOS 26 introduced Liquid Glass. On a capable device we want menus inside the Planning Center App `WebView` to match the surrounding native UI instead of looking like a flat white card pasted on top of it.

Everything is scoped under `[data-supports-liquid-glass]`. Outside a capable PCA `WebView` the attribute is absent, every selector fails, and `Dropdown` renders as it does today. **No change to markup, props, or public API** — this is CSS only.

The styles cover:

- the popover surface — translucent tint, `backdrop-filter`, rim highlight, specular glint, ambient + contact shadow
- the items — corner radius, hover fill, and a text halo

Values live in `--glass-*` custom properties, so the whole material retunes from one block.

## Light and dark

Follows Tapestry's own convention exactly: light is the base, dark is a full override block on `:root[data-color-mode="dark"]`, repeated for `:root[data-color-mode="system"]` inside `@media (prefers-color-scheme: dark)`.

That mirrors how `tokens.css` / `tokens-dark.css` are structured, so it reads the same way as the rest of the package. I deliberately did **not** use `light-dark()` — Tapestry doesn't, and the material needs numeric values (brightness, saturation) that `light-dark()` can't hold anyway.

## One selector detail

`data-supports-liquid-glass` and `data-color-mode` land on the **same element**, so the dark rules can't put a descendant combinator between them. Each dark selector is a pair:

```css
:root[data-color-mode="dark"] [data-supports-liquid-glass],
:root[data-color-mode="dark"][data-supports-liquid-glass] {
  /* … */
}
```

The first matches when the glass flag is on a descendant; the second when it's on `<html>` itself. PCA only produces the second — the first keeps the styles testable in this demo, where each frame opts in individually.

## Legibility

A translucent menu over an arbitrary photo is the hard part, and it's an accessibility concern rather than a purely visual one. Dark text over a dark, busy backdrop has nowhere to go.

Four levers carry it, tuned together against twelve background photos (abstract and nature, light and dark):

| Lever                | Role                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `--glass-tint`       | The opacity floor. Kept low (0.34 light) so the scene reads through.                        |
| `--glass-blur`       | Dissolves detail into an even field. Legible shapes behind text are worse than a flat wash. |
| `--glass-brightness` | Lifts a dark backdrop in light mode (1.32); **darkens** it in dark mode (0.7).              |
| `--glass-text-halo`  | A 3px halo in the surface color, too faint to read as a shadow. Protects glyph edges.       |

Two findings worth passing on, because both are counterintuitive:

- **High saturation hurts legibility.** Early design explorations used `saturate(185%)`, which made the backdrop _more_ colorful exactly where text needs a calm surface – it's now 140%.
- **Dark mode wants brightness _down_, not up.** Raising it over dark content turns the material to grey mud. Lowering brightness while raising saturation keeps colors vivid and text legible.

**Caveat, stated plainly:** this is tuned by eye. `backdrop-filter` output isn't readable from JavaScript, so WCAG contrast ratios couldn't be computed programmatically. It holds across the twelve photos in the demo; a pathological background (high-frequency black-and-white noise) could still cause trouble. The text halo is what makes that degrade gracefully rather than totally.

Use the demo's background picker to test this — that's what it's for.

## Why these styles belong in Tapestry

The alternative — PCA owning this CSS — is defensible, so this deserves a real argument rather than an assertion.

**They're coupled to Tapestry's internal DOM.** The selectors reach for `.tds-dropdown-popover`, `.tds-dropdown-item`, `[data-hovered]`, and `[data-focus-visible]`. None of those are public API. If PCA owned this CSS, a routine refactor inside `Dropdown` could rename a class, ship as a patch release, and silently break the styling in the app. Nothing in CI would catch it — the two live in different repos with no dependency between them.

Keeping the CSS next to the markup it targets means a rename breaks it in the same PR that causes it, where it's obvious and fixable.

**What this costs Tapestry:** carrying styles for a rendering context the package otherwise knows nothing about. That's a real cost and worth naming. The mitigation is that the surface area is small — one CSS file, no JS, no API
change — and entirely inert outside PCA.

**The contract this creates** is in [context](./context.md#the-contract). The short version: Tapestry guarantees one attribute keeps working; PCA guarantees it keeps setting it. That's smaller and more stable than the alternative, where PCA would have to track Tapestry's internal class names across releases.

## Demo

The third frame in each row shows this, and the toolbar's background picker cycles through twelve photos to stress-test legibility.

## Open questions

1. Should this live in `Dropdown`'s CSS, or a separate opt-in stylesheet (`liquid-glass.css`) consumers import? The latter keeps the main bundle smaller but reintroduces some drift risk.
2. Is `backdrop-filter` acceptable in the package? Well-supported now, but compositing-heavy and a first for Tapestry.
3. Should the `--glass-*` tokens should be promoted to shared tokens rather than living in `Dropdown`'s file.
