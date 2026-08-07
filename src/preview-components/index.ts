import { ActionsMenu } from "./ActionsMenu"
import { ContactMenu } from "./ContactMenu"

const components = {
  ActionsMenu,
  ContactMenu,
}

export type PreviewComponent = keyof typeof components

/**
 * Indexed by the `component` query param, so the lookup accepts any string and
 * yields `undefined` for one that isn't registered — no type guard needed at
 * the call site. `Frame` still takes `PreviewComponent`, so the gallery can
 * only ask for a component that exists.
 */
export const previewComponents: Record<
  string,
  (typeof components)[PreviewComponent] | undefined
> = components
