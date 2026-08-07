import {
  Dropdown,
  DropdownAction,
  DropdownButton,
  DropdownMenu,
  DropdownTrigger,
} from "@planningcenter/tapestry"

export const ActionsMenu = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <DropdownButton label="Actions" />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownAction id="edit_profile" onAction={() => {}}>
          Edit profile
        </DropdownAction>
        <DropdownAction id="manage_permissions" onAction={() => {}}>
          Manage permissions
        </DropdownAction>
        <DropdownAction id="perform_action" onAction={() => {}}>
          Perform action
        </DropdownAction>
        <DropdownAction id="merge_profile" onAction={() => {}}>
          Merge profile
        </DropdownAction>
        <DropdownAction id="set_inactive" onAction={() => {}}>
          Set inactive
        </DropdownAction>
        <DropdownAction id="delete_profile" destructive onAction={() => {}}>
          Delete profile
        </DropdownAction>
      </DropdownMenu>
    </Dropdown>
  )
}
