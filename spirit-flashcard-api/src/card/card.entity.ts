import { FlashcardDeck } from "@src/flashcard-deck/flashcard-deck.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"
import { Schedule } from "../schedule/card-schedule.entity"

@Entity('cards')
export class Card {
    @PrimaryGeneratedColumn()
    id: number

    //TODO: ADD USER FIELD

    @Column()
    question: string

    @Column()
    answer: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @ManyToOne(() => FlashcardDeck, deck => deck.cards)
    deck: FlashcardDeck

    @OneToOne(() => Schedule, schedule => schedule.card, { cascade: true })
    schedule: Schedule;
}