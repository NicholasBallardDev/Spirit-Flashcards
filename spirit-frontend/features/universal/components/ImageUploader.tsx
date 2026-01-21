"use client"

import { ChangeEvent, useState } from "react"
import axios from "axios"

type UploadStatus = "idle" | "uploading" | "success" | "error"

interface ImageUploaderProps {
  cardId: number
  imageType: "questionImage" | "answerImage"
}

export function ImageUploader({ cardId, imageType }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleFileUpload = async () => {
    if (!file) return

    setStatus("uploading")
    setUploadProgress(0)

    const formData = new FormData()
    formData.append("file", file)

    const endpointPath =
      imageType === "questionImage" ? "question-image" : "answer-image"

    try {
      await axios.put(
        `http://localhost:3000/cards/${cardId}/${endpointPath}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round(progressEvent.loaded * 100) / progressEvent.total
              : 0
            setUploadProgress(progress)
          },
        },
      )
      setStatus("success")
      setUploadProgress(100)
    } catch (error) {
      console.error("Image upload failed:", error)
      setUploadProgress(0)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {file && status !== "uploading" && (
        <button onClick={handleFileUpload}>Upload</button>
      )}
      {status === "success" && <p>success</p>}
      {status === "error" && <p>failure</p>}
      {status === "uploading" && <p>{uploadProgress}%</p>}
    </div>
  )
}
