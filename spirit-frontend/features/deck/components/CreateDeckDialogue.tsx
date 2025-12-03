"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createDeck } from "@/server/services/deck.service";

interface CreateDeckDialogProps {
  trigger: React.ReactNode;
}

export function CreateDeckDialog({ trigger }: CreateDeckDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    createDeck({name: name, description: description, cards: []});
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new deck</DialogTitle>
          <DialogDescription>
            Enter a name and optional description for your deck.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="deck-name">Deck Name</Label>
            <Input
              id="deck-name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Algebra Basics"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="deck-description">Description</Label>
            <Input
              id="deck-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Optional description..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 text-white hover:bg-blue-500"
          >
            Create Deck
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
