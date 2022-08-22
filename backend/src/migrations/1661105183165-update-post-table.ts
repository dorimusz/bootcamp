import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1661105183165 implements MigrationInterface {
    name = 'updatePostTable1661105183165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" ADD "usersId" integer`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_7e870866a44fe8b6e88a6829457" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_7e870866a44fe8b6e88a6829457"`);
        await queryRunner.query(`ALTER TABLE "repository" DROP COLUMN "usersId"`);
    }

}
