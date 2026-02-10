import Image from "next/image"
import RemoveButton from "./RemoveButton"
import CardImage from "@/Types/CardImage"
import React from "react"
import { deleteImage } from "@/server/services/image.service"

interface ImageEditViewProps {
  image: CardImage
  onImageRemove: (imageId: number) => void
}

export default function ImageEditView({
  image,
  onImageRemove,
}: ImageEditViewProps) {
  return (
    <>
      <div className="w-fit relative group">
        <Image
          width={200}
          height={200}
          src={image.url}
          alt={image.filename}
          className="w-[200px] h-[200px] object-cover rounded-xl"
        />
        <div className="absolute top-[-10px] right-[-10px]">
          <RemoveButton
            onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
              // Stop the click event from bubbling up to the ImageUploader
              e.stopPropagation()
              await deleteImage(image.id)
              onImageRemove(image.id)
            }}
          />
        </div>
      </div>
    </>
  )
}
