import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1751201267118 implements MigrationInterface {
    name = 'CreateTables1751201267118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "isPrivate"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "isPrivate" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "isPrivate"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "isPrivate" character varying NOT NULL DEFAULT false`);
    }

}
