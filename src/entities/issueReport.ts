import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'issue_report' })
export class IssueReport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  title!: string;

  @Column({ type: 'varchar', length: 1000 })
  content!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
