import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1751203634737 implements MigrationInterface {
    name = 'CreateTables1751203634737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "duration" integer NOT NULL DEFAULT '30'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "duration"`);
    }

}
