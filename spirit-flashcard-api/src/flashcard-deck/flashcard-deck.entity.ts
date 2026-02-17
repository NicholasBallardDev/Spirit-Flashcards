import { Card } from '@src/card/card.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('decks')
export class FlashcardDeck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_DATE' })
  createdAt: Date;

  @OneToMany(() => Card, (card) => card.deck)
  cards: Card[];
}
