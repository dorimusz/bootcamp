import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1660826863597 implements MigrationInterface {
    name = 'updatePostTable1660826863597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" ALTER COLUMN "language" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" ALTER COLUMN "language" SET NOT NULL`);
    }

}
