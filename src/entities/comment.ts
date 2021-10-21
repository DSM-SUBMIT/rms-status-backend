import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 20 })
  title!: string;

  @Column({ type: 'varchar', length: 50 })
  content!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
