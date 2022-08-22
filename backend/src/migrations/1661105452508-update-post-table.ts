import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1661105452508 implements MigrationInterface {
    name = 'updatePostTable1661105452508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_7e870866a44fe8b6e88a6829457"`);
        await queryRunner.query(`CREATE TABLE "user_repositories_repository" ("userId" integer NOT NULL, "repositoryId" integer NOT NULL, CONSTRAINT "PK_bd9ad3c2b8fff7192163bb80d6a" PRIMARY KEY ("userId", "repositoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1c114381f4ea8c4373da8b3780" ON "user_repositories_repository" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1811080b83dfae34c3062920c8" ON "user_repositories_repository" ("repositoryId") `);
        await queryRunner.query(`ALTER TABLE "repository" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "user_repositories_repository" ADD CONSTRAINT "FK_1c114381f4ea8c4373da8b3780e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_repositories_repository" ADD CONSTRAINT "FK_1811080b83dfae34c3062920c89" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_repositories_repository" DROP CONSTRAINT "FK_1811080b83dfae34c3062920c89"`);
        await queryRunner.query(`ALTER TABLE "user_repositories_repository" DROP CONSTRAINT "FK_1c114381f4ea8c4373da8b3780e"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD "usersId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1811080b83dfae34c3062920c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1c114381f4ea8c4373da8b3780"`);
        await queryRunner.query(`DROP TABLE "user_repositories_repository"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_7e870866a44fe8b6e88a6829457" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
