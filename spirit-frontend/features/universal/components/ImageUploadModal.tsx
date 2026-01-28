import { ImageUp } from "lucide-react"
import { Button } from "@/components/ui/button"
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

interface ImageUploadModalProps {
  card: Card
  children: ReactNode
}

export const ImageUploadModal = ({ card, children }: ImageUploadModalProps) => {
  return (
    <Dialog>
      {/* The button that opens the modal */}
      <DialogTrigger asChild>{children}</DialogTrigger>

      {/* The Modal Content */}
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden bg-white p-6 pb-0">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Upload Image
          </DialogTitle>
          <DialogDescription className="text-base text-gray-500">
            Add images to your flashcard
          </DialogDescription>
        </DialogHeader>

        {/* Question Upload Dropzone */}
        <h3 className="text-md font-semibold mb-2">Question</h3>
        <ImageUploader cardId={card.id} imageType="questionImage">
          {card.questionImage ? (
            <img src={card.questionImage.url} />
          ) : (
            <UploadDropZone />
          )}
        </ImageUploader>

        {/* Answer Upload Dropzone */}
        <h3 className="text-md font-semibold mb-2">Answer</h3>
        <ImageUploader cardId={card.id} imageType="answerImage">
          {card.answerImage ? (
            <img src={card.answerImage.url} />
          ) : (
            <UploadDropZone />
          )}
        </ImageUploader>

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
