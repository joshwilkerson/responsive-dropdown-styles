import { useEffect, useState } from "react"
import { images, type ImagePair } from "../background_image_pairs"

const STORAGE_KEY = "tapestry-dropdown-responsive-demo:selected-image-pair-id"
const CHANGE_EVENT = "selected-image-pair-change"

function readSelectedImagePairId(): string {
  const stored = localStorage.getItem(STORAGE_KEY)
  return images.some((pair) => pair.id === stored) ? stored! : images[0].id
}

function broadcastChange() {
  window.dispatchEvent(new Event(CHANGE_EVENT))

  document.querySelectorAll("iframe").forEach((frame) => {
    frame.contentWindow?.dispatchEvent(new Event(CHANGE_EVENT))
  })
}

export function useSelectedImagePair(): [ImagePair, (id: string) => void] {
  const [selectedId, setSelectedId] = useState(readSelectedImagePairId)

  useEffect(() => {
    const onChange = () => setSelectedId(readSelectedImagePairId())
    window.addEventListener(CHANGE_EVENT, onChange)
    return () => window.removeEventListener(CHANGE_EVENT, onChange)
  }, [])

  const selectImagePair = (id: string) => {
    localStorage.setItem(STORAGE_KEY, id)
    setSelectedId(id)
    broadcastChange()
  }

  const selectedImagePair = images.find((pair) => pair.id === selectedId)!

  return [selectedImagePair, selectImagePair]
}
