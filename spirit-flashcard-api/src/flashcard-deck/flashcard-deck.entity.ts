import { Card } from "@src/card/card.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"

@Entity('decks')
export class FlashcardDeck{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_DATE'})
    createdAt: Date

    @OneToMany(() => Card, (card) => card.deck)
    cards: Card[]
}