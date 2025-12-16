import { Card } from "@src/card/card.entity";
import { State } from "ts-fsrs";
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
}
