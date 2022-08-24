import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1661353612751 implements MigrationInterface {
    name = 'updatePostTable1661353612751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_36ca13d9e734f9e2d02b0476d68"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_d2084068d6246a419df6fec9d0f"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "repository" RENAME COLUMN "ownerId" TO "ownerUserId"`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD "userUserId" integer`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_c6882f368f1d34db13293f7fac6" FOREIGN KEY ("ownerUserId") REFERENCES "user"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_411147cc9a85e6a5eaf5be2a3b3" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_411147cc9a85e6a5eaf5be2a3b3"`);
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_c6882f368f1d34db13293f7fac6"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "repository" RENAME COLUMN "ownerUserId" TO "ownerId"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "userId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_d2084068d6246a419df6fec9d0f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_36ca13d9e734f9e2d02b0476d68" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
