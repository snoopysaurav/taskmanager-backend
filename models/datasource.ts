import { DataSource } from "typeorm/data-source";
import dotenv from "dotenv";

dotenv.config();

const AppDatasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

AppDatasource.initialize()
  .then(() => {
    console.log(`Database source has been initalized`);
  })
  .catch((err) => {
    console.log("Error during database initalization", err);
  });

export { AppDatasource };
