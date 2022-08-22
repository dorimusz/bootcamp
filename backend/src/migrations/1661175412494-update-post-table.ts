import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1661175412494 implements MigrationInterface {
    name = 'updatePostTable1661175412494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" ADD "repository" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD "repositoryId" integer`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_d2084068d6246a419df6fec9d0f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_63690620d26e29b5c1ee56f057d" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_63690620d26e29b5c1ee56f057d"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_d2084068d6246a419df6fec9d0f"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP COLUMN "repositoryId"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP COLUMN "repository"`);
    }

}
