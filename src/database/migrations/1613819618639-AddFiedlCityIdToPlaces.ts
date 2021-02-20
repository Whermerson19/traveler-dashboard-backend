import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddFiedlCityIdToPlaces1613819618639
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "places",
      new TableColumn({
        name: "city_id",
        type: "varchar",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "places",
      new TableForeignKey({
        name: "Places_City",
        columnNames: ["city_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "cities",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("places", "city_id");
    await queryRunner.dropForeignKey("places", "Places_City");
  }
}
