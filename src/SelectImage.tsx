import { Fragment, type ComponentProps, type FC } from "react"
import styles from "./SelectImage.module.css"

import {
  Dropdown,
  DropdownAction,
  DropdownIconButton,
  DropdownMenu,
  DropdownSection,
  DropdownSeparator,
  DropdownTrigger,
  Flex,
} from "@planningcenter/tapestry"
import Icon from "./Icon"
import {
  getThumbnailImageSrc,
  images,
  type ImagePair,
} from "./background_image_pairs"
import { useSelectedImagePair } from "./utils/useSelectedImagePair"

// Tapestry's DropdownAction type doesn't expose React Aria's
// `shouldCloseOnSelect`, but it spreads through to the underlying MenuItem
// at runtime, so we widen the type to pass it.
const KeepOpenDropdownAction = DropdownAction as FC<
  ComponentProps<typeof DropdownAction> & { shouldCloseOnSelect?: boolean }
>

const Thumbnail = ({ src }: { src: string }) => {
  return (
    <div
      className={styles.thumbnail}
      style={{ backgroundImage: `url(${src})` }}
      role="img"
    />
  )
}

const imagesByType = images.reduce<Record<string, ImagePair[]>>(
  (groups, imagePair) => {
    ;(groups[imagePair.type] ??= []).push(imagePair)
    return groups
  },
  {},
)

const titleize = (value: string) => value[0].toUpperCase() + value.slice(1)

export const SelectImage = () => {
  const [selectedImagePair, selectImagePair] = useSelectedImagePair()

  return (
    <Dropdown>
      <DropdownTrigger>
        <DropdownIconButton
          aria-label="Select background image"
          icon={<Icon aria-hidden symbol="general#image" />}
        />
      </DropdownTrigger>
      <DropdownMenu placement="bottom end">
        {Object.entries(imagesByType).map(
          ([type, imagePairs], sectionIndex) => (
            <Fragment key={type}>
              {sectionIndex > 0 && <DropdownSeparator />}
              <DropdownSection title={titleize(type)}>
                {imagePairs!.map((imagePair) => (
                  <KeepOpenDropdownAction
                    key={imagePair.id}
                    id={imagePair.id}
                    shouldCloseOnSelect={false}
                    onAction={() => selectImagePair(imagePair.id)}
                  >
                    <Flex gap={2} align="center" style={{ width: "100%" }}>
                      <Thumbnail src={getThumbnailImageSrc(imagePair.light)} />
                      <Thumbnail src={getThumbnailImageSrc(imagePair.dark)} />
                      {imagePair.id === selectedImagePair.id && (
                        <Icon
                          aria-hidden
                          slot="suffix"
                          symbol="general#check"
                        />
                      )}
                    </Flex>
                  </KeepOpenDropdownAction>
                ))}
              </DropdownSection>
            </Fragment>
          ),
        )}
      </DropdownMenu>
    </Dropdown>
  )
}
