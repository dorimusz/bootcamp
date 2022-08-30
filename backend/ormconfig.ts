// import { ConnectionOptions } from 'typeorm';  //DEPRECATED
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'src/entity/repository.entity';
import { Contribution } from 'src/entity/contribution.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  entities: [User, Repository, Contribution],
  migrations: ['./migrations/*.ts'],
  synchronize: false, // might be true for development only - false for production, can cause data loss
  logging: true,
};

export default config;

/*
dataSource needed because of typeorm migrations, which are not part of the app module. app module contains this config file

if ormcomnfig is a .json file, which is imported by the app module can add:
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    }
however the TypeOrmModuleOptions class does not have a cli property, so we need to add it manually
*/
