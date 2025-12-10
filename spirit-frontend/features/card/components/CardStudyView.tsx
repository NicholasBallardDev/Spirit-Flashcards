import { useState } from "react";

interface CardStudyProps {
  question: string
  answer: string
}

export function CardStudyView({ question, answer }: CardStudyProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }
  return (
    <div onClick={handleFlip} className="w-full h-full flex items-center justify-center p-4 border border-gray-300 rounded-lg p-6 bg-white shadow-md select-none">
        <h2>{isFlipped ? answer : question}</h2>
    </div>
  );
}