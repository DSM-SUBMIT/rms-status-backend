import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
