import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Test } from "./tests.entity";

@Entity({ name: "questions" })
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @Column({ type: "text", array: true, default: [] })
  options!: string[];

  @Column({ type: "timestamp" })
  updated_at?: Date;

  @Column({ type: "timestamp" })
  created_at?: Date;

  @ManyToOne(() => Test, (t) => t.questions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "test_id" })
  test!: Test;
}
