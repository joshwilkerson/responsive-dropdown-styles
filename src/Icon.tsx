import general from "@planningcenter/icons/sprites/general.svg"
import toolbar from "@planningcenter/icons/sprites/toolbar.svg"

import { Symbol } from "@planningcenter/icons/symbol"
import type { HTMLAttributes } from "react"

const validCollections = {
  general,
  toolbar,
} as const

type CollectionName = keyof typeof validCollections

function isValidCollection(collection: string): collection is CollectionName {
  return collection in validCollections
}

function Icon({
  symbol: s,
  className,
  ...props
}: { symbol: string } & HTMLAttributes<SVGSVGElement>) {
  const [collection, symbol] = s.split("#") as [CollectionName, string]

  if (!isValidCollection(collection)) {
    throw new Error(
      `Unknown icon collection: ${collection}. Available collections: ${Object.keys(validCollections).join(", ")}`,
    )
  }

  const spriteSheet = validCollections[collection]
  return (
    <Symbol
      symbol={`${spriteSheet}#${symbol}`}
      className={className}
      {...props}
    />
  )
}

export default Icon
