import Link from "next/link"

export default async function DeckPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const deckId = parseInt((await params).id)
  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Deck Options</h1>
      <div className="flex gap-6">
        <Link
          href={`/decks/${deckId}/edit`}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors text-xl font-semibold"
        >
          Edit Deck
        </Link>
        <Link
          href={`/decks/${deckId}/study`}
          className="px-8 py-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors text-xl font-semibold"
        >
          Study Deck
        </Link>
      </div>
    </div>
  )
}
