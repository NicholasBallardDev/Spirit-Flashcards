import { FlashcardDeck } from "@src/flashcard-deck/flashcard-deck.entity"
import { State } from "ts-fsrs"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

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

    @Column()
    due: Date

    @Column()
    stability: number;

    @Column()
    difficulty: number;

    @Column()
    elapsed_days: number;

    @Column()
    scheduled_days: number;

    @Column()
    learning_steps: number;

    @Column()
    reps: number;

    @Column()
    lapses: number;

    @Column()
    state: State;

    @Column()
    last_review?: Date;
    
}