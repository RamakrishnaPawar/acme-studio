import {getConnection, Repository} from "typeorm";
import {Clients} from "../models/Clients";
import {AsyncContainerModule} from "inversify";
import {TYPE} from "../constants/Type";
import {createDbConnection} from "../db";
import {Costs} from "../models/Costs";
import {CostTypes} from "../models/CostTypes";
import {Projects} from "../models/Projects";

export const bindings = new AsyncContainerModule(async (bind) => {
    await createDbConnection();
    bind<Repository<Clients>>(TYPE.ClientsRepository).toDynamicValue(() => {
        const conn = getConnection();
        return conn.getRepository(Clients);
    }).inRequestScope();

    bind<Repository<Costs>>(TYPE.CostsRepository).toDynamicValue(() => {
        const conn = getConnection();
        return conn.getRepository(Costs);
    }).inRequestScope();


    bind<Repository<CostTypes>>(TYPE.CostTypesRepository).toDynamicValue(() => {
        const conn = getConnection();
        return conn.getRepository(CostTypes);
    }).inRequestScope();

    bind<Repository<Projects>>(TYPE.ProjectsRepository).toDynamicValue(() => {
        const conn = getConnection();
        return conn.getRepository(Projects);
    }).inRequestScope();
});

