import { ChevronRight } from "lucide-react"

interface MetricCardProps {
  number: number
  title: string
  subtitle: string
}

export function MetricCard({ number, title, subtitle }: MetricCardProps) {
  return (
    <div className="flex-1 min-w-0 bg-white pt-10 pb-16 pl-6 pr-14 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between relative h-full">
      <div className="flex gap-4">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl bg-blue-50 text-blue-500`}
        >
          {number}
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 leading-tight">{subtitle}</p>
        </div>
      </div>

      <div className="absolute bottom-6 right-6">
        <button className="flex items-center text-sm font-semibold text-gray-900 hover:underline cursor-pointer">
          Explore
          <ChevronRight className="mt-[2px]" size={16} />
        </button>
      </div>
    </div>
  )
}
