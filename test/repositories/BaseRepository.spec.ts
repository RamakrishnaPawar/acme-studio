import {Connection} from "typeorm";
import {createDbConnection} from "../../src/db";
import {Clients} from "../../src/models/Clients";
import {Costs} from "../../src/models/Costs";
import { Projects} from "../../src/models/Projects";
import {CostTypes} from "../../src/models/CostTypes";

export abstract class BaseRepositorySpec {
    public connection!: Connection;
    private static entities = [Clients, Costs, CostTypes, Projects];


    public async beforeEach(): Promise<void> {
        this.connection = await createDbConnection('justtest');
        BaseRepositorySpec.entities.forEach(entity => {
            this.connection.getRepository(entity).clear();
        })
    }

    public async after(): Promise<void> {
        await this.connection?.close();
    }
}
