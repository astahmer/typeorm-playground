import { getConnection } from "typeorm";

export function testingThings() {
    console.log(getConnection().entityMetadatas.map((meta) => meta.tableName));
}
