module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["dist/**/*.entity.js"],
  factories: ["dist/**/*.factory.js"],
  seeds: ["dist/**/*.seeder.js"],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: true,
};