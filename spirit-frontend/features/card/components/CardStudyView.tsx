interface CardStudyProps {
  question: string
  answer: string
}

export function AddCardButton({ question, answer }: CardStudyProps) {

  return (
    <div>
        {question}
    </div>
  );
}