# Tapestry `Dropdown` — proposed changes

A working demo of two proposed changes to `Dropdown` in
`@planningcenter/tapestry`, built for the Tapestry team to evaluate.

### → [View the demo](https://joshwilkerson.github.io/responsive-dropdown-styles/)

The changes are separate but related — both come out of rendering People inside the Planning Center app's WebView. Read them in order:

|                | Doc                                                         | What it covers                                                                            |
| -------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Start here** | [Context](./docs/context.md)                                | How PCA renders People, and the attributes it injects. Both of the others depend on this. |
|                | [Width-based sizing for touch](./docs/responsive-sizing.md) | Larger touch targets below 599px. Introduces a new pattern for Tapestry.                  |
|                | [Liquid Glass styles](./docs/liquid-glass.md)               | iOS 26 glass treatment for capable devices. Includes the ownership argument.              |

---

## The demo

Six frames, arranged as two rows — one per example component (`ActionsMenu`, `ContactMenu`). Each row shows the same component in three states:

| Frame                            | Width | Shows                                                    |
| -------------------------------- | ----- | -------------------------------------------------------- |
| **Default**                      | 620px | Current Tapestry sizing, unchanged                       |
| **Adjusted for mobile**          | 380px | Responsive sizing — the `max-width: 599px` block applied |
| **Mobile + Liquid Glass styles** | 380px | Responsive sizing + Liquid Glass together                |

Open a menu in each to compare. The differences are in the popover and its items, so a closed menu shows almost nothing.

### Toolbar controls

**Background image** — cycles through twelve photos (six light/dark pairs, in Abstract and Nature sets). This is the Liquid Glass stress test: the glass styles have to keep menu text legible over whatever is behind them, and some of these photos are deliberately hostile. The busy foliage and deep teal ocean shots are the ones that broke earlier iterations.

**Color mode** — Light, Dark, or System. Sets `data-color-mode` on `<html>`, the same attribute PCA injects, so this exercises the real code path rather than a simulation. Each background is a _pair_ — switching mode cross-fades to the photo chosen for that mode.

Both settings persist in `localStorage`.

---

## How the demo is built

Mostly worth knowing for one reason: **every frame is a real `<iframe>`**, and that's load-bearing rather than incidental.

The responsive sizing keys off `@media (max-width: 599px)`. In a single document that query resolves against the browser window, so all six frames would match or not match together — no side-by-side comparison possible. Giving each frame its own document means each gets its own viewport, and the media query resolves against
the frame's width instead.

That's also why the demo can show the 620px and 380px states at the same time on a desktop screen.

### Where the proposed CSS lives

**`src/dropdown_overrides.css`** — this is the whole proposal, and the only file that would ship to Tapestry. Everything else in `src/` is demo scaffolding: the gallery, the toolbar, and the plumbing that mirrors color mode and background into each iframe.
