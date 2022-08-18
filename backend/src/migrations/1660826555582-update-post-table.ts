import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1660826555582 implements MigrationInterface {
    name = 'updatePostTable1660826555582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."name-idx"`);
        await queryRunner.query(`ALTER TABLE "repository" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD "full_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "repository" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "repository" DROP COLUMN "html_url"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD "html_url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "repository" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD "language" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "name-idx" ON "repository" ("full_name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."name-idx"`);
        await queryRunner.query(`ALTER TABLE "repository" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD "language" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "repository" DROP COLUMN "html_url"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD "html_url" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "repository" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD "description" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "repository" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD "full_name" character varying(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX "name-idx" ON "repository" ("full_name") `);
    }

}
