export const getFullImageSrc = (id: string) => {
  return `https://images.unsplash.com/${id}?fm=jpg&q=70&w=1000&h=1400&fit=crop`
}

export const getThumbnailImageSrc = (id: string) => {
  return `https://images.unsplash.com/${id}?fm=jpg&q=80&w=100&h=100&fit=crop`
}

export type ImagePair = {
  id: string
  type: string
  light: string
  dark: string
}

export const images: ImagePair[] = [
  {
    id: "abstract-1",
    type: "abstract",
    light: "photo-1576502200916-3808e07386a5",
    dark: "photo-1688494930098-e88c53c26e3a",
  },
  {
    id: "abstract-2",
    type: "abstract",
    light: "photo-1604076913837-52ab5629fba9",
    dark: "photo-1620641788421-7a1c342ea42e",
  },
  {
    id: "abstract-3",
    type: "abstract",
    light: "photo-1618005182384-a83a8bd57fbe",
    dark: "photo-1579548122080-c35fd6820ecb",
  },
  {
    id: "nature-1",
    type: "nature",
    light: "photo-1771838026270-28fd7e3bef1d",
    dark: "photo-1436891620584-47fd0e565afb",
  },
  {
    id: "nature-2",
    type: "nature",
    light: "photo-1540206395-68808572332f",
    dark: "photo-1533371452382-d45a9da51ad9",
  },
  {
    id: "nature-3",
    type: "nature",
    light: "photo-1655985355087-e4e30bca6551",
    dark: "photo-1783313207203-3d039ba6d2a5",
  },
]
