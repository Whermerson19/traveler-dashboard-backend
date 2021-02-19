import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddFieldCategoryIdToPlaces1613732901792
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "places",
      new TableColumn({
        name: "category_id",
        type: "varchar",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "places",
      new TableForeignKey({
        name: "Places_Categories",
        columnNames: ["category_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "categories",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("places", "Places_Categories");
    await queryRunner.dropColumn("places", "category_id");
  }
}
