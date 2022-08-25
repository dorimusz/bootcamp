import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1661416255646 implements MigrationInterface {
    name = 'updatePostTable1661416255646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_411147cc9a85e6a5eaf5be2a3b3"`);
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_c6882f368f1d34db13293f7fac6"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "repository" DROP COLUMN "ownerUserId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_d72ea127f30e21753c9e229891e"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_1bd17e66f73b77cbd47fe4bef0b" PRIMARY KEY ("userId", "id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_1bd17e66f73b77cbd47fe4bef0b"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_d2084068d6246a419df6fec9d0f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_36ca13d9e734f9e2d02b0476d68" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_36ca13d9e734f9e2d02b0476d68"`);
        await queryRunner.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_d2084068d6246a419df6fec9d0f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_1bd17e66f73b77cbd47fe4bef0b" PRIMARY KEY ("userId", "id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_1bd17e66f73b77cbd47fe4bef0b"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "repository" ADD "ownerUserId" integer`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD "userUserId" integer`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_c6882f368f1d34db13293f7fac6" FOREIGN KEY ("ownerUserId") REFERENCES "user"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_411147cc9a85e6a5eaf5be2a3b3" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
