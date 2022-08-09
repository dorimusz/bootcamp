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
  // migrations: ['src/migration/**/*.ts'],
  synchronize: true, // might be true for development only - false for production, can cause data loss
};

export default config;