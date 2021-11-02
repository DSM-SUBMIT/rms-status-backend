import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Outage } from './outage';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Outage, (outage) => outage.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'outage_id' })
  outageId!: Outage;

  @Column({ type: 'varchar', length: 20 })
  title!: string;

  @Column({ type: 'varchar', length: 60 })
  content!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
