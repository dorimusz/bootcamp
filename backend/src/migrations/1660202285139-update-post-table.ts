import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1660202285139 implements MigrationInterface {
    name = 'updatePostTable1660202285139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "valami"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "valami" character varying(255) NOT NULL`);
    }

}
