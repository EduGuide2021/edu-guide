import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  username!: string;

  @Column()
  levelStrand!: string;

  @Column()
  school!: string;

  @Column()
  password!: string;

  @Column()
  is_admin!: boolean;

  @Column({default:""})
  general_test_score!: string;

  @Column({default:0})
  general_test_count!: number;

  @Column({default:0})
  special_test_count!: number;
}
