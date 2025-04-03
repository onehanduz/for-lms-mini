import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Test } from "./tests.entity";

@Entity({ name: "centers" })
export class Center {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "timestamp" })
  updated_at?: Date;

  @Column({ type: "timestamp" })
  created_at?: Date;

  @OneToMany(() => Test, (t) => t.center)
  tests!: Test[];
}
