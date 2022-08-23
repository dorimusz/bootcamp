import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1661245827812 implements MigrationInterface {
    name = 'updatePostTable1661245827812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" DROP COLUMN "commit_count"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" ADD "commit_count" integer NOT NULL`);
    }

}
