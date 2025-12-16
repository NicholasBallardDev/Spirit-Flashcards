import { Card } from "@src/card/card.entity";
import { State, Card as FSRSCard  } from "ts-fsrs";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

@Entity('card_schedules')
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Card, card => card.schedule, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn()
    card: Card;

    @Column({ type: 'timestamp' })
    due: Date;

    @Column({ type: 'float' })
    stability: number;

    @Column({ type: 'float' })
    difficulty: number;

    @Column()
    scheduled_days: number;

    @Column()
    elapsed_days: number;

    @Column()
    learning_steps: number;

    @Column()
    reps: number;

    @Column()
    lapses: number;

    @Column({
        type: 'enum',
        enum: State,
        default: State.New
    })
    state: State;

    @Column({ type: 'timestamp', nullable: true })
    last_review?: Date;

    /**
     * Transforms the Schedule entity into a plain object suitable for ts-fsrs calculations.
     */
    toSchedulingCard(): FSRSCard {
        return {
            stability: this.stability,
            difficulty: this.difficulty,
            scheduled_days: this.scheduled_days,
            learning_steps: this.learning_steps,
            elapsed_days: this.elapsed_days,
            reps: this.reps,
            lapses: this.lapses,
            state: this.state,
            due: this.due,
            last_review: this.last_review,
        };
    }
}
