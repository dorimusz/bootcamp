import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1661415175050 implements MigrationInterface {
    name = 'updatePostTable1661415175050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_9430bbb7fc27efe7abbdd5310d2"`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_e3f20d5609e7d92da8a89043bda" PRIMARY KEY ("userId", "repositoryId", "id")`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_63690620d26e29b5c1ee56f057d"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_e3f20d5609e7d92da8a89043bda"`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_61f1496f3e68469f4eeeba930f5" PRIMARY KEY ("repositoryId", "id")`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_61f1496f3e68469f4eeeba930f5"`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_878330fa5bb34475732a5883d58" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_63690620d26e29b5c1ee56f057d" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_63690620d26e29b5c1ee56f057d"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_878330fa5bb34475732a5883d58"`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_61f1496f3e68469f4eeeba930f5" PRIMARY KEY ("repositoryId", "id")`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_61f1496f3e68469f4eeeba930f5"`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_e3f20d5609e7d92da8a89043bda" PRIMARY KEY ("userId", "repositoryId", "id")`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_63690620d26e29b5c1ee56f057d" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "PK_e3f20d5609e7d92da8a89043bda"`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "PK_9430bbb7fc27efe7abbdd5310d2" PRIMARY KEY ("userId", "repositoryId")`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP COLUMN "id"`);
    }

}
