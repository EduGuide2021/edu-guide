import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  content!: string;

  @Column()
  creator!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | undefined;

  @Column()
  is_approved!: boolean;
  
}
