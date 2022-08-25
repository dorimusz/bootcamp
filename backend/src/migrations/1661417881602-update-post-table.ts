import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1661417881602 implements MigrationInterface {
    name = 'updatePostTable1661417881602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userId" integer NOT NULL, "login" character varying, "avatar_url" character varying, "html_url" character varying, "type" character varying, CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE INDEX "login-idx" ON "user" ("login") `);
        await queryRunner.query(`CREATE TABLE "repository" ("id" integer NOT NULL, "ownerId" integer NOT NULL, "full_name" character varying, "description" character varying, "html_url" character varying, "language" character varying, "stargazer_count" integer, "ownerUserId" integer, CONSTRAINT "PK_b842c26651c6fc0b9ccd1c530e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "name-idx" ON "repository" ("full_name") `);
        await queryRunner.query(`CREATE TABLE "contribution" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "repositoryId" integer NOT NULL, "commit_count" integer, "userUserId" integer, CONSTRAINT "PK_878330fa5bb34475732a5883d58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_c6882f368f1d34db13293f7fac6" FOREIGN KEY ("ownerUserId") REFERENCES "user"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_411147cc9a85e6a5eaf5be2a3b3" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_63690620d26e29b5c1ee56f057d" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_63690620d26e29b5c1ee56f057d"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_411147cc9a85e6a5eaf5be2a3b3"`);
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_c6882f368f1d34db13293f7fac6"`);
        await queryRunner.query(`DROP TABLE "contribution"`);
        await queryRunner.query(`DROP INDEX "public"."name-idx"`);
        await queryRunner.query(`DROP TABLE "repository"`);
        await queryRunner.query(`DROP INDEX "public"."login-idx"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
