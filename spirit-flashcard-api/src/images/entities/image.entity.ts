import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  key: string;

  @Column()
  filename: string;

  url: string;
}
