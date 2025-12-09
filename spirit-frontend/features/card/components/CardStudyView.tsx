interface CardStudyProps {
  question: string
  answer: string
}

export function CardStudyView({ question, answer }: CardStudyProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 border border-gray-300 rounded-lg p-6 bg-white shadow-md">
        <h2>{question}</h2>
    </div>

  );
}