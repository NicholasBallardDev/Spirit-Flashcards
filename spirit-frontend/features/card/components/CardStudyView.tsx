"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface CardStudyProps {
  question: string;
  answer: string;
}

export function CardStudyView({ question, answer }: CardStudyProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div
      onClick={handleFlip}
      className="w-full h-full flex items-center justify-center p-6 border border-gray-300 rounded-lg bg-white shadow-md select-none cursor-pointer hover:shadow-xl hover:shadow-blue-400/30"
    >
      <motion.h2
        key={isFlipped ? "answer" : "question"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl font-semibold text-center"
      >
        {isFlipped ? answer : question}
      </motion.h2>
    </div>
  );
}
