"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/Types"
import Image from "next/image"

interface CardStudyProps {
  card: Card
}

export function CardStudyView({ card }: CardStudyProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => setIsFlipped(!isFlipped)

  return (
    <div
      onClick={handleFlip}
      className="w-full h-full flex items-center justify-center p-6 border border-gray-300 rounded-lg 
      bg-white shadow-md select-none cursor-pointer hover:shadow-xl hover:shadow-blue-400/30 mb-4"
    >
      <motion.div
        key={isFlipped ? "answer" : "question"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4 w-full overflow-auto max-h-full"
      >
        <div className="w-[80%]">
          <h2 className="text-xl font-semibold text-center text-pretty break-words">
            {isFlipped ? card.answer : card.question}
          </h2>
        </div>
        {isFlipped && card.answerImage && (
          <Image
            src={card.answerImage.url}
            alt="Answer"
            className="max-h-60 object-contain rounded-md"
          />
        )}
        {!isFlipped && card.questionImage && (
          <Image
            src={card.questionImage.url}
            alt="Question"
            className="max-h-60 object-contain rounded-md"
          />
        )}
      </motion.div>
    </div>
  )
}
