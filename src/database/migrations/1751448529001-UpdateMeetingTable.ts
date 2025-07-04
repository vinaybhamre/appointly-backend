import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMeetingTable1751448529001 implements MigrationInterface {
    name = 'UpdateMeetingTable1751448529001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "calendarAppType"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" ADD "calendarAppType" character varying NOT NULL`);
    }

}
