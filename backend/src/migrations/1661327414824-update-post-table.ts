import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1661327414824 implements MigrationInterface {
    name = 'updatePostTable1661327414824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" ADD "commit_count" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" DROP COLUMN "commit_count"`);
    }

}
