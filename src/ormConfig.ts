import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: ["entities/**/*.*"],
  host: process.env.POSTGRES_DB_ENDPOINT,
  port: 5432,
  username: process.env.POSTGRES_DB_USERNAME,
  password: process.env.POSTGRES_DB_PASSWORD
};

export default connectionOptions;
