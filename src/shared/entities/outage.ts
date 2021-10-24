import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment';

@Entity('outage')
export class Outage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'varchar', length: 100 })
  related!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Column({ type: 'varchar', length: 6 })
  severity!: string;

  @Column()
  resolved!: boolean;

  @OneToMany((type) => Comment, (comment) => comment.outageId)
  comments!: Comment[];
}
