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
  generate: autocompares;
  create: generates
    - none of it runs it
npx typeorm-ts-node-commonjs migration:run -d ./src/app-data-source.ts


The CLI can only run .js files, so need to specify the transpiled files in the dist folder as migration folder in the ormconfig.
-up method has the logic for the migration, down is for reverting it
-migrations are executed in transactions
-files are executed in alphabetical order
*/
