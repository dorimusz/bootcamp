import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1660827041529 implements MigrationInterface {
    name = 'updatePostTable1660827041529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" ALTER COLUMN "full_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "repository" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "repository" ALTER COLUMN "html_url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "repository" ALTER COLUMN "stargazer_count" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" ALTER COLUMN "stargazer_count" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "repository" ALTER COLUMN "html_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "repository" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "repository" ALTER COLUMN "full_name" SET NOT NULL`);
    }

}
