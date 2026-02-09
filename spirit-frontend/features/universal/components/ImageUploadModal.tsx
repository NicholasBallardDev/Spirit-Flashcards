import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { ImageUploader } from "./ImageUploader"
import { ReactNode } from "react"
import { UploadDropZone } from "./UploadDropZone"
import { Card } from "@/Types"
import { ScrollArea } from "@/components/ui/scroll-area"
import RemoveButton from "./RemoveButton"
import ImageEditView from "./ImageEditView"

interface ImageUploadModalProps {
  card: Card
  children: ReactNode
  onCardChange?: (card: Card) => void
}

export const ImageUploadModal = ({
  card,
  children,
  onCardChange,
}: ImageUploadModalProps) => {
  return (
    <Dialog>
      {/* The button that opens the modal */}
      <DialogTrigger asChild>{children}</DialogTrigger>

      {/* The Modal Content */}
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Upload Image
          </DialogTitle>
          <DialogDescription className="text-base text-gray-500">
            Add images to your flashcard
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
          {/* Question Upload Dropzone */}
          <h3 className="text-md font-semibold mb-2">Question</h3>
          <ImageUploader
            cardId={card.id}
            imageType="questionImage"
            onUploadComplete={onCardChange}
          >
            {card.questionImage ? (
              <ImageEditView image={card.questionImage} />
            ) : (
              <UploadDropZone />
            )}
          </ImageUploader>

          {/* Answer Upload Dropzone */}
          <h3 className="text-md font-semibold mb-2">Answer</h3>
          <ImageUploader
            cardId={card.id}
            imageType="answerImage"
            onUploadComplete={onCardChange}
          >
            {card.answerImage ? (
              <ImageEditView image={card.answerImage} />
            ) : (
              <UploadDropZone />
            )}
          </ImageUploader>
        </ScrollArea>
        {/* Footer Actions */}
        <DialogFooter className="p-6 bg-gray-50/50 mt-4 sm:justify-end gap-3 border-t border-gray-100">
          <DialogClose asChild>
            <Button className="px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ImageUploadModal
