import {Repository} from "typeorm";
import {inject, injectable} from "inversify";
import {TYPE} from "../constants/Type";
import {CostTypes} from "../models/CostTypes";


@injectable()
export class CostTypesRepository {
    private readonly repository: Repository<CostTypes>;

    constructor(@inject(TYPE.CostTypesRepository) repository: Repository<CostTypes>) {
        this.repository = repository;
    }

    public async findAll(): Promise<CostTypes[] | undefined> {
        return await this.repository.find();
    }

    public async findById(id: number): Promise<CostTypes | undefined> {
        return await this.repository.findOne({id: id});
    }

    public async findByParentId(parentId: number): Promise<CostTypes[]> {
        return await this.repository.find({where: {parentId: parentId}, order: {id: "ASC"}})
    }
}
