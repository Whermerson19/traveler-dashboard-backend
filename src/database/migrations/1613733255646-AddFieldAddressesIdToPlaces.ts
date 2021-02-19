import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddFieldAddressesIdToPlaces1613733255646
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "places",
      new TableColumn({
        name: "addresses_id",
        type: "varchar",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "places",
      new TableForeignKey({
        name: "Places_Addresses",
        columnNames: ["addresses_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "addresses",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("places", "Places_Addresses");
    await queryRunner.dropColumn("places", "addresses_id");
  }
}
