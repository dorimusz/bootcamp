// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// import { ConnectionOptions } from 'typeorm';  //DEPRECATED
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  entities: ['src/entity/**/*.ts'],
  // migrations: ['src/migration/**/*.ts'],
  synchronize: false, // might be true for development only - false for production, can cause data loss
};

export default config;
