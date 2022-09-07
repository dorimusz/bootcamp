import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1662557714987 implements MigrationInterface {
    name = 'updatePostTable1662557714987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_878330fa5bb34475732a5883d58"`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_e3f20d5609e7d92da8a89043bda" PRIMARY KEY ("id", "userId", "repositoryId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_e3f20d5609e7d92da8a89043bda"`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_878330fa5bb34475732a5883d58" PRIMARY KEY ("id")`);
    }

}
