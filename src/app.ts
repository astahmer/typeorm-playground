import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
// import * as Router from "koa-router";

import { Connection, createConnection, getConnectionOptions } from "typeorm";

import { getOrmConfig } from "./ormconfig";
import { Article, Comment, Role, Image, Upvote, User } from "@/entity/index";
import { testingThings } from "@/functions/testing";

const logger = console;

/** Creates connection and returns it */
export async function createConnectionToDatabase() {
    const entities = [Article, Comment, Image, Role, Upvote, User];
    const envOptions = await getConnectionOptions();
    const useSqlJS = !process.env.HOST; // if host is defined, using docker
    const options = { ...(useSqlJS ? {} : envOptions), ...(getOrmConfig(useSqlJS) as any), entities };

    return createConnection(options);
}

/** Make app & linsten on given port & return it */
export async function makeApp(connection: Connection) {
    const app = new Koa();
    await connection.synchronize(true);
    logger.info("Starting Koa server...");

    app.use(bodyParser());
    testingThings();
    // app.use(logRequest(logger));

    // const entities = [Article, Comment, Image, Role, Upvote, User];
    // const entities = connection.entityMetadatas.map((meta) => meta.target);
    // useEntitiesRoutes({ app, connections: [connection], entities });

    // Always validate when no groups are passed on validators
    // entities.forEach(setEntityValidatorsDefaultOption);

    const port = process.env.PORT ? parseInt(process.env.PORT) : undefined;
    const server = app.listen(port, process.env.HOST);
    logger.info("Listening on port " + (port || (server.address() as any).port));

    return server;
}
