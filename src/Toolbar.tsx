import styles from "./Toolbar.module.css"
import { Flex } from "@planningcenter/tapestry"
import "@planningcenter/tapestry/index.css"
import type { ReactNode } from "react"

export const Toolbar = ({
  title,
  subtitle,
  rightContent,
}: {
  title: string
  subtitle?: string
  rightContent?: ReactNode
}) => {
  return (
    <Flex
      paddingBlock={1.5}
      paddingInline={3}
      className={styles.toolbar}
      justify="space-between"
      align="center"
    >
      <Flex direction="column">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </Flex>
      {rightContent}
    </Flex>
  )
}
