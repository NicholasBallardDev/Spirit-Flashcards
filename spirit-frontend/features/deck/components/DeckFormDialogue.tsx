// c:\Users\nbnic\OneDrive\Documents\SpiritFlashcards\Spirit-Flashcards\spirit-frontend\features\deck\components\DeckFormDialog.tsx
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DeckFormDialogProps {
  trigger: React.ReactNode
  title: string
  description: string
  defaultValues?: {
    name: string
    description: string
  }
  submitLabel: string
  onSubmit: (values: { name: string; description: string }) => Promise<void>
}

export function DeckFormDialog({
  trigger,
  title,
  description,
  defaultValues = { name: "", description: "" },
  submitLabel,
  onSubmit,
}: DeckFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(defaultValues.name)
  const [desc, setDesc] = useState(defaultValues.description)

  const handleSubmit = async () => {
    if (!name.trim()) return
    await onSubmit({ name, description: desc })
    setOpen(false)
    setName(name)
    setDesc(desc)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="deck-name">Deck Name</Label>
            <Input
              id="deck-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Algebra Basics"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="deck-description">Description</Label>
            <Input
              id="deck-description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Optional description..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 text-white hover:bg-blue-500"
          >
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
