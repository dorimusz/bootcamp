import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1660209857244 implements MigrationInterface {
    name = 'updatePostTable1660209857244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "login-idx" ON "user" ("login") `);
        await queryRunner.query(`CREATE INDEX "name-idx" ON "repository" ("full_name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."name-idx"`);
        await queryRunner.query(`DROP INDEX "public"."login-idx"`);
    }

}
