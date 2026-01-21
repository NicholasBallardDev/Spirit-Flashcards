import { FlashcardDeck } from '@src/flashcard-deck/flashcard-deck.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Schedule } from '../schedule/card-schedule.entity';
import { Image } from '@src/images/entities/image.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  //TODO: ADD USER FIELD

  @Column()
  question: string;

  @Column()
  answer: string;

  @OneToOne(() => Image, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  questionImage: Image;

  @OneToOne(() => Image, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  answerImage: Image;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => FlashcardDeck, (deck) => deck.cards, { onDelete: 'CASCADE' })
  deck: FlashcardDeck;

  @OneToOne(() => Schedule, (schedule) => schedule.card, { cascade: true })
  schedule: Schedule;
}
