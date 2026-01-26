"use client"
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

interface ImageUploadModalProps {
  cardId: number
  children: ReactNode
}

export const ImageUploadModal = ({
  cardId,
  children,
}: ImageUploadModalProps) => {
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
        <ImageUploader cardId={cardId} imageType="questionImage">
          <UploadDropZone />
        </ImageUploader>

        {/* Answer Upload Dropzone */}
        <h3 className="text-md font-semibold mb-2">Answer</h3>
        <ImageUploader cardId={cardId} imageType="answerImage">
          <UploadDropZone />
        </ImageUploader>

        {/* Footer Actions */}
        <DialogFooter className="p-6 bg-gray-50/50 mt-4 sm:justify-end gap-3 border-t border-gray-100">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="px-6 border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button className="px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ImageUploadModal
