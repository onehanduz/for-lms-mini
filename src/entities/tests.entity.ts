import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Center } from "./centers.entity";
import { Question } from "./questions.entity";

@Entity({ name: "tests" })
export class Test {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description?: string;

  @Column({ type: "timestamp" })
  updated_at?: Date;

  @Column({ type: "timestamp" })
  created_at?: Date;

  @ManyToOne(() => Center, (t) => t.tests, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "center_id" })
  center!: Center;

  @OneToMany(() => Question, (t) => t.test)
  questions!: Question[];
}
