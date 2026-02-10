import Image from "next/image"
import RemoveButton from "./RemoveButton"
import CardImage from "@/Types/CardImage"

interface ImageEditViewProps {
  image: CardImage
}

export default function ImageEditView({ image }: ImageEditViewProps) {
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
          <RemoveButton onClick={() => null} />
        </div>
      </div>
    </>
  )
}
