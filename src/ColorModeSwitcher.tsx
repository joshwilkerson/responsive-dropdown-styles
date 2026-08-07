import {
  Dropdown,
  DropdownTrigger,
  DropdownIconButton,
  DropdownMenu,
  DropdownAction,
} from "@planningcenter/tapestry"

import Icon from "./Icon"
import { COLOR_MODES, getColorModeOption } from "./utils/colorMode"
import { useColorMode } from "./utils/useColorMode"

export const ColorModeSwitcher = () => {
  const { colorMode, setColorMode } = useColorMode()
  const active = getColorModeOption(colorMode)

  return (
    <Dropdown>
      <DropdownTrigger>
        <DropdownIconButton
          aria-label={`Color mode: ${active.label}`}
          icon={<Icon aria-hidden symbol={active.icon} />}
        />
      </DropdownTrigger>
      <DropdownMenu placement="bottom end">
        {COLOR_MODES.map(({ id, label, icon }) => (
          <DropdownAction
            key={id}
            id={id}
            onAction={() => setColorMode(id)}
            textValue={label}
          >
            <Icon aria-hidden slot="prefix" symbol={icon} />
            <span slot="label">{label}</span>
          </DropdownAction>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
