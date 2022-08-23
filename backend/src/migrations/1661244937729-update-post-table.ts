import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1661244937729 implements MigrationInterface {
    name = 'updatePostTable1661244937729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" ADD "commit_count" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contribution" ALTER COLUMN "id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_878330fa5bb34475732a5883d58" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_878330fa5bb34475732a5883d58"`);
        await queryRunner.query(`ALTER TABLE "contribution" ALTER COLUMN "id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP COLUMN "commit_count"`);
    }

}
