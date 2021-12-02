import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class SpecialTest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  test_name!: string;

  @Column()
  creator!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | undefined;

  @Column()
  score!: number;
  
}
