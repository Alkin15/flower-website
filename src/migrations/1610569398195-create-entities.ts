import {MigrationInterface, QueryRunner} from "typeorm";

export class createEntities1610569398195 implements MigrationInterface {
    name = 'createEntities1610569398195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`CREATE TABLE "flowers" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer(10,2) NOT NULL, "title" character varying NOT NULL, "category" character varying NOT NULL, "shopName" character varying NOT NULL, "imageUrl" character varying NOT NULL, "slug" character varying NOT NULL, "username" character varying, CONSTRAINT "PK_5dcdc7d45b8dbbde569c5f3f10c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "flowers" ADD CONSTRAINT "FK_3fceb18ef7cb819ba8ab75f4b14" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flowers" DROP CONSTRAINT "FK_3fceb18ef7cb819ba8ab75f4b14"`);
        await queryRunner.query(`DROP TABLE "flowers"`);
        await queryRunner.query(`DROP INDEX "IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
