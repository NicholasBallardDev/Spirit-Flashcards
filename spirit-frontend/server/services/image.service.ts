import type { Image, ImageWithUrl } from "@/Types"

const API_URL = "http://localhost:3000"

export async function getImages(): Promise<Image[]> {
  const res = await fetch(`${API_URL}/images`)
  const data = await res.json()
  if (!res.ok) {
    throw new Error(`Failed to fetch images: ${data.message}`)
  }
  return data
}

export async function getImage(id: number): Promise<ImageWithUrl> {
  const res = await fetch(`${API_URL}/images/${id}`)
  const data = await res.json()
  if (!res.ok) {
    throw new Error(`Failed to fetch image ${id}: ${data.message}`)
  }
  return data
}

export async function createImage(file: File, newKey: string): Promise<Image> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("newKey", newKey)

  const res = await fetch(`${API_URL}/images`, {
    method: "POST",
    body: formData,
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(`Failed to create image: ${data.message}`)
  }

  return data
}

export async function updateImage(
  id: number,
  file: File,
  newKey: string,
): Promise<Image> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("newKey", newKey)

  const res = await fetch(`${API_URL}/images/${id}`, {
    method: "PATCH",
    body: formData,
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(`Failed to update image ${id}: ${data.message}`)
  }

  return data
}

export async function deleteImage(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/images/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(`Failed to delete image ${id}: ${error.message}`)
  }
}
