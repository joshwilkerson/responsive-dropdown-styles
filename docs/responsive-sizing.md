# Dropdown: responsive styles for mobile

## What changes

Below `599px`, `DropdownItem` gets more padding and a larger corner radius:

```css
@media (max-width: 599px) {
  .tds-dropdown-popover {
    border-radius: var(--t-border-radius-lg);
  }

  .tds-dropdown-item {
    padding-inline: var(--t-spacing-2); /* 16px, from 12px */
    padding-block: var(--t-spacing-1-half); /* 12px, from 8px */
    border-radius: var(--t-border-radius-lg); /* 8px, from 4px */
  }
}
```

At default font-size, the touchable area for each `DropdownAction` increases from **~34px to ~42px**.

On the target: Apple's HIG asks for 44pt; WCAG 2.2 (2.5.8, AA) asks for 24px. So this clears WCAG comfortably and lands just under Apple's guideline. Using `--t-spacing-2` (16px) for block padding would reach ~50px, which visually appeared "too loose". I opted for the closer fit — worth revisiting if the team disagrees.

## Why this is worth flagging

**This is a new pattern for Tapestry.** Components size from props, not from the viewport. This is the first case of a component changing its own metrics based on available width.

Design has approved it. The rationale: a viewport under 600px is overwhelmingly a phone, and the cost of being wrong is a slightly roomier menu on a small desktop window — not a broken layout.

### Why width and not `pointer: coarse`

`@media (pointer: coarse)` looks like the more semantically correct query, but it misreports on hybrid devices — a touchscreen laptop reports coarse while being driven by a trackpad. Width is the blunter signal but the more reliable one for the case we care about, which is a phone-sized WebView.

## Demo

The first two frames in each row show this side by side:

| Frame               | Width | Shows                                |
| ------------------- | ----- | ------------------------------------ |
| Default             | 620px | Current Tapestry sizing              |
| Adjusted for mobile | 380px | The `max-width: 599px` block applied |

Each frame is a real iframe, so the media query resolves against the frame's own
width rather than the browser window — see the
[README](../README.md#how-the-demo-is-built)
for why that matters.

## What we'd like from the Tapestry team

Agreement on the precedent more than the numbers. If width-based styling is acceptable here, it's worth deciding whether it becomes a general pattern (a shared breakpoint token, applied consistently across components) or stays a documented exception for menus. We'd rather not be the first of several one-offs.

## Open questions

1. Is the breakpoint acceptable as a general pattern, or a documented exception for menus? If general, it wants a shared token rather than a bare `599px`.
2. Should the target be the full 44px (Apple HIG) at the cost of a looser menu?
3. Do other components with touch targets — `Select`, `ComboBox` — want the same treatment at the same breakpoint?
