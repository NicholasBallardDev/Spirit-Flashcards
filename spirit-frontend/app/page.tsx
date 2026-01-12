"use client"
import { MetricCard } from "@/features/dashboard/components/MetricCard"
import Image from "next/image"

export default function Home() {
  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="w-full max-w-6xl px-6">
        <h1 className="ml-2 font-bold text-2xl">Overview</h1>
        <div className="flex mt-4 gap-10">
          <MetricCard
            key={1}
            number={23}
            title={"Total Decks"}
            subtitle={"You have quite alot to study!"}
            onClick={() => console.log(`Navigating to food`)}
          />
          <MetricCard
            key={2}
            number={98}
            title={"Total Cards"}
            subtitle={"Keep up and study hard!"}
            onClick={() => console.log(`Navigating to food`)}
          />
          <MetricCard
            key={3}
            number={52}
            title={"Cards Due"}
            subtitle={"Do your daily reviews!"}
            onClick={() => console.log(`Navigating to food`)}
          />
        </div>
      </div>
    </div>
  )
}
