import {In, Repository} from "typeorm";
import {inject, injectable} from "inversify";
import {TYPE} from "../constants/Type";
import {Costs} from "../models/Costs";


@injectable()
export class CostsRepository {
    private readonly repository: Repository<Costs>;

    constructor(@inject(TYPE.CostsRepository) repository: Repository<Costs>) {
        this.repository = repository;
    }

    public async findAll(): Promise<Costs[] | undefined> {
        return await this.repository.find();
    }

    public async findById(id: number): Promise<Costs | undefined> {
        return await this.repository.findOne({id: id});
    }

    public async findByProjectId(projectId: number): Promise<Costs[]> {
        return await this.repository.find({where: {projectId: projectId}, order: {costTypeId: "ASC"}});
    }

    async findByCostTypeIds(costTypeIds: number[]) {
        return await this.repository.find({costTypeId: In(costTypeIds)});
    }
}
