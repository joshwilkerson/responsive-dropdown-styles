import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@planningcenter/tapestry/tapestry-reset.css"
import "@planningcenter/tapestry/tokens.css"
import "@planningcenter/tapestry/tokens-dark.css"

import "./color_scheme.css"

import { App } from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
