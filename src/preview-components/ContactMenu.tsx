import {
  Dropdown,
  DropdownAction,
  DropdownButton,
  DropdownMenu,
  DropdownTrigger,
  DropdownSeparator,
} from "@planningcenter/tapestry"

import Icon from "../Icon"

export const ContactMenu = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <DropdownButton label="Contact" />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownAction id="call" onAction={() => {}}>
          <Icon aria-hidden slot="prefix" symbol="general#phone" />
          <span slot="label">Call</span>
        </DropdownAction>
        <DropdownAction id="text" onAction={() => {}}>
          <Icon aria-hidden slot="prefix" symbol="general#text-message" />
          <span slot="label">Text</span>
        </DropdownAction>
        <DropdownAction id="email" onAction={() => {}}>
          <Icon aria-hidden slot="prefix" symbol="general#envelope" />
          <span slot="label">Email</span>
        </DropdownAction>
        <DropdownAction id="planning_center_email" onAction={() => {}}>
          <Icon aria-hidden slot="prefix" symbol="toolbar#planning-center" />
          <span slot="label">Planning Center email</span>
        </DropdownAction>
        <DropdownSeparator />
        <DropdownAction id="add_to_contacts" onAction={() => {}}>
          <Icon aria-hidden slot="prefix" symbol="general#plus-person" />
          <span slot="label">Add to contacts</span>
        </DropdownAction>
      </DropdownMenu>
    </Dropdown>
  )
}
