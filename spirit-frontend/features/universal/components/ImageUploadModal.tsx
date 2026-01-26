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
          <div className="mb-2">
            <div
              className="border-2 border-dashed border-blue-200 rounded-xl h-40 flex flex-col 
            items-center justify-center cursor-pointer hover:bg-blue-50/60 transition-colors group"
            >
              <div className="bg-white p-2.5 rounded-xl shadow-sm mb-3 group-hover:scale-105 transition-transform">
                <ImageUp className="h-6 w-6 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="text-blue-600 font-semibold hover:underline">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-400">Max. File Size: 15MB</p>
            </div>
          </div>
        </ImageUploader>

        {/* Answer Upload Dropzone */}
        <h3 className="text-md font-semibold mb-2">Answer</h3>
        <ImageUploader cardId={cardId} imageType="answerImage">
          <div className="mb-2">
            <div
              className="border-2 border-dashed border-blue-200 rounded-xl h-40 flex flex-col 
            items-center justify-center cursor-pointer hover:bg-blue-50/60 transition-colors group"
            >
              <div className="bg-white p-2.5 rounded-xl shadow-sm mb-3 group-hover:scale-105 transition-transform">
                <ImageUp className="h-6 w-6 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="text-blue-600 font-semibold hover:underline">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-400">Max. File Size: 15MB</p>
            </div>
          </div>
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
