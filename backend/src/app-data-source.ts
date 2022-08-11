import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'secretpwd',
  database: 'bootcamp',
  entities: [`dist/**/*.entity{.ts,.js}`],
  migrations: [`dist/src/migrations/*.js`],
  synchronize: false,
});

/*
npm run build
npx typeorm-ts-node-esm migration:generate ./src/migrations/update-post-table -d ./src/app-data-source.ts
npx typeorm-ts-node-commonjs migration:run -d ./src/app-data-source.ts
*/
