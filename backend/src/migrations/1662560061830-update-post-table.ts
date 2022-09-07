import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1662560061830 implements MigrationInterface {
    name = 'updatePostTable1662560061830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_c6882f368f1d34db13293f7fac6"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_c6882f368f1d34db13293f7fac6" FOREIGN KEY ("ownerUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_c6882f368f1d34db13293f7fac6"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_c6882f368f1d34db13293f7fac6" FOREIGN KEY ("ownerUserId") REFERENCES "user"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
