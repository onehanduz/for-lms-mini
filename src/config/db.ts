import { DataSource } from "typeorm";
import "reflect-metadata";
export const DB = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5431,
  username: "test",
  password: "test",
  database: "test",
  synchronize: false,
  logging: true,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  migrations: ["../migrations/**/*.{js,ts}"],
});
