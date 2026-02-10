"use client"

import {
  ChangeEvent,
  useState,
  useRef,
  ReactNode,
  Children,
  isValidElement,
} from "react"
import axios from "axios"
import { Card } from "@/Types"
import { cn } from "@/lib/utils"
import ImageEditView from "./ImageEditView"

type UploadStatus = "idle" | "uploading" | "success" | "error"

interface ImageUploaderProps {
  cardId: number
  imageType: "questionImage" | "answerImage"
  children: ReactNode
  onUploadComplete?: (card: Card) => void
}

export function ImageUploader({
  cardId,
  imageType,
  children,
  onUploadComplete,
}: ImageUploaderProps) {
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleTriggerClick = () => {
    // Trigger the hidden file input
    inputRef.current?.click()
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setStatus("uploading")
    setUploadProgress(0)

    const formData = new FormData()
    formData.append("file", file)

    const endpointPath =
      imageType === "questionImage" ? "question-image" : "answer-image"

    try {
      const response = await axios.put<Card>(
        `http://localhost:3000/cards/${cardId}/${endpointPath}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0
            setUploadProgress(progress)
          },
        },
      )
      setStatus("success")
      onUploadComplete?.(response.data)
    } catch (error) {
      setStatus("error")
      setUploadProgress(0)
      if (axios.isAxiosError(error) && error.response) {
        console.error("Image upload failed:", error.response.data)
      } else {
        console.error("Image upload failed:", error)
      }
    } finally {
      // Reset the input value to allow re-uploading the same file
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    }
  }

  const isImageEditView = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === ImageEditView,
  )

  return (
    <>
      <div className="w-[100%] flex justify-center ">
        <div
          onClick={handleTriggerClick}
          className={cn("cursor-pointer w-full", isImageEditView && "w-fit")}
        >
          {children}
        </div>
      </div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* UI feedback for upload status */}
      {status === "uploading" && <p>Uploading: {uploadProgress}%</p>}
      {status === "success" && <p>Success!</p>}
      {status === "error" && <p>Upload failed.</p>}
    </>
  )
}
