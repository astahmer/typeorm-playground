import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { SqljsConnectionOptions } from "typeorm/driver/sqljs/SqljsConnectionOptions";

export const getOrmConfig = (useSqljs?: boolean) =>
    useSqljs
        ? ({
              type: "sqljs",
              logging: false,
              dropSchema: true, // Isolate each test case
              synchronize: true,
          } as SqljsConnectionOptions)
        : ({
              type: "mariadb",
              username: process.env.TYPEORM_USERNAME,
              password: process.env.TYPEORM_PASSWORD,
              synchronize: true,
              logging: ["query"],
              logger: "file",
              entities: ["src/entity/**/*.ts"],
              migrations: ["src/migration/**/*.ts"],
              cli: {
                  entitiesDir: "src/entity",
                  migrationsDir: "src/migration",
              },
          } as MysqlConnectionOptions);
