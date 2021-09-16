import {createConnection} from "typeorm";
import {Costs} from "./models/Costs";
import {Clients} from "./models/Clients";
import {CostTypes} from "./models/CostTypes";
import {Projects} from "./models/Projects";



export async function createDbConnection(dbName?: string) {

    // TODO : Add it in config file
    const DATABASE_HOST = "localhost";
    const DATABASE_USER = "default";
    const DATABASE_PORT = 5432;
    const DATABASE_PASSWORD = "default";
    const DATABASE_DB = dbName || "default";

    const entities = [
        Clients, Costs, CostTypes, Projects
    ];

    const conn = await createConnection({
        type: "postgres",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB,
        entities: entities,
        synchronize: false
    });

    return conn;

}
