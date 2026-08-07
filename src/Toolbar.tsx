import { Flex } from "@planningcenter/tapestry"
import { ColorModeSwitcher } from "./ColorModeSwitcher"

import styles from "./Toolbar.module.css"
import { SelectImage } from "./SelectImage"

export const Toolbar = ({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
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
      <Flex gap={2}>
        <SelectImage />
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  )
}
