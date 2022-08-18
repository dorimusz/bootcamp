import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1660829395959 implements MigrationInterface {
    name = 'updatePostTable1660829395959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."login-idx"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "login" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar_url"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar_url" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "html_url"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "html_url" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "type" character varying`);
        await queryRunner.query(`CREATE INDEX "login-idx" ON "user" ("login") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."login-idx"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "type" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "html_url"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "html_url" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar_url"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar_url" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "login" character varying(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX "login-idx" ON "user" ("login") `);
    }

}
