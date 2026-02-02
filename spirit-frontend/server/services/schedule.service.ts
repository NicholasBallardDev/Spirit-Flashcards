import { Schedule, State, Rating } from "@/Types/schedule"
import { IPreview } from "ts-fsrs"

const API_URL = "http://localhost:3000"

export async function getSchedules(): Promise<Schedule[]> {
  const res = await fetch(`${API_URL}/schedule`)
  return res.json()
}

export async function getSchedule(id: number): Promise<Schedule> {
  const res = await fetch(`${API_URL}/schedule/${id}`)
  return res.json()
}

export async function getSchedulesByState(state: State): Promise<Schedule[]> {
  const res = await fetch(`${API_URL}/schedule/state/${state}`)
  return res.json()
}

export async function getPreview(id: number): Promise<IPreview> {
  const res = await fetch(`${API_URL}/schedule/${id}/preview`)
  return res.json()
}

export async function getSchedulesByDeckAndState(
  deckId: number,
  state: State,
): Promise<Schedule[]> {
  const urlParams = new URLSearchParams({
    state: String(state),
  })
  const res = await fetch(`${API_URL}/schedule/deck/${deckId}?` + urlParams)
  return res.json()
}

export async function createSchedule(): Promise<Schedule> {
  const res = await fetch(`${API_URL}/schedule`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
  return res.json()
}

export async function updateSchedule(
  id: number,
  rating: Rating,
): Promise<Schedule> {
  const urlParams = new URLSearchParams({
    rating: String(rating),
  })
  const res = await fetch(`${API_URL}/schedule/${id}?` + urlParams, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) {
    throw new Error(`Failed to update schedule ${id}`)
  }

  return res.json()
}
