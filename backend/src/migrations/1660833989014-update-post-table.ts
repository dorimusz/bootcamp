import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1660833989014 implements MigrationInterface {
    name = 'updatePostTable1660833989014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" ADD "commit_count" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" DROP COLUMN "commit_count"`);
    }

}
