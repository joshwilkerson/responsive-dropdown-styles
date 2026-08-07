import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@planningcenter/tapestry/tapestry-reset.css"
import "@planningcenter/tapestry/index.css"
import "@planningcenter/tapestry/tokens.css"
import "@planningcenter/tapestry/tokens-dark.css"
import "./dropdown_overrides.css"

import "./color_scheme.css"

import { LiquidGlassContainer } from "./LiquidGlassContainer"
import { previewComponents } from "./preview-components"

const params = new URLSearchParams(location.search)
const component = params.get("component")
const supportsLiquidGlass = params.get("supportsLiquidGlass") === "true"

const Component = component ? previewComponents[component] : undefined

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {Component &&
      (supportsLiquidGlass ? (
        <LiquidGlassContainer>
          <Component />
        </LiquidGlassContainer>
      ) : (
        <Component />
      ))}
  </StrictMode>,
)
