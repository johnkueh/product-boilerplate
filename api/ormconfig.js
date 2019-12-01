require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const dev = {
  type: "postgres",
  port: 5432,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  migrations: ["schema/migrations/*.ts"],
  entities: ["schema/entities/*.ts"],
  cli: {
    migrationsDir: "schema/migrations"
  }
};

module.exports = dev;
