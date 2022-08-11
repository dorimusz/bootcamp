import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1660140751677 implements MigrationInterface {
    name = 'updatePostTable1660140751677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contribution" ("user" integer NOT NULL, "repository" integer NOT NULL, "userId" integer, "repositoryId" integer, CONSTRAINT "PK_fd10fc23a9542609ad395b09281" PRIMARY KEY ("user"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer NOT NULL, "login" character varying(255) NOT NULL, "avatar_url" character varying(255) NOT NULL, "html_url" character varying(255) NOT NULL, "type" character varying(255) NOT NULL, "valami" character varying(255) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "repository" ("id" integer NOT NULL, "owner" integer NOT NULL, "full_name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "html_url" character varying(255) NOT NULL, "language" character varying(255) NOT NULL, "stargazer_count" integer NOT NULL, "ownerId" integer, CONSTRAINT "PK_b842c26651c6fc0b9ccd1c530e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_d2084068d6246a419df6fec9d0f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_63690620d26e29b5c1ee56f057d" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_36ca13d9e734f9e2d02b0476d68" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_36ca13d9e734f9e2d02b0476d68"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_63690620d26e29b5c1ee56f057d"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_d2084068d6246a419df6fec9d0f"`);
        await queryRunner.query(`DROP TABLE "repository"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "contribution"`);
    }

}
