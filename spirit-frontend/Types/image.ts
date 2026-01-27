export interface Image {
  id: number
  key: string
  filename: string
}

export type ImageWithUrl = Image & { url: string }
