interface RatingButtonTrayProps {
  deckId: number
  onRate: (rating: string) => void
}

export function RatingButtonTray({ deckId, onRate }: RatingButtonTrayProps) {
  const btn =
    "px-4 py-2 rounded-full text-white text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/40 bg-[#1D4ED8] hover:bg-[#2563EB]"

  return (
    <div className="flex justify-center items-center gap-4 w-full">
      <button className={`${btn} basis-36`} onClick={() => onRate("Renew")}>
        Renew
      </button>
      <button className={`${btn} basis-36`} onClick={() => onRate("Challenge")}>
        Challenge
      </button>
      <button className={`${btn} basis-36`} onClick={() => onRate("Flow")}>
        Flow
      </button>
      <button className={`${btn} basis-36`} onClick={() => onRate("Mastery")}>
        Mastery
      </button>
    </div>
  )
}
