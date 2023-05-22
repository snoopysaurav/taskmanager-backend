import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { TaskEntity } from "./task.entity";
import { UserEntity } from "./user.entity";

dotenv.config();

const AppDatasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [TaskEntity, UserEntity],
  synchronize: true,
});

export { AppDatasource };
