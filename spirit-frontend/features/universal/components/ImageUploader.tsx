"use client"

import React, { ChangeEvent, useRef, useState } from "react"
import axios from "axios"

type UploadStatus = "idle" | "uploading" | "success" | "error"

export function ImageUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  // const fileInputRef = useRef<HTMLInputElement>(null)

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

    try {
      await axios.post("https://httpbin.org/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round(progressEvent.loaded * 100) / progressEvent.total
            : 0
          setUploadProgress(progress)
        },
      })
      setStatus("success")
      setUploadProgress(100)
    } catch {
      console.log("error")
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
