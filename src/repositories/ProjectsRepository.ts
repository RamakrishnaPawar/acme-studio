import {Repository} from "typeorm";
import {inject, injectable} from "inversify";
import {TYPE} from "../constants/Type";
import {Projects} from "../models/Projects";


@injectable()
export class ProjectsRepository {
    private readonly repository: Repository<Projects>;

    constructor(@inject(TYPE.ProjectsRepository) repository: Repository<Projects>) {
        this.repository = repository;
    }

    public async findAll(): Promise<Projects[] | undefined> {
        return await this.repository.find();
    }

    public async findById(id: number): Promise<Projects | undefined> {
        return await this.repository.findOne({id: id});
    }

    public async findByClientId(clientId: number): Promise<Projects[]> {
        return await this.repository.find({where: {clientId: clientId}});
    }

    async findByIds(projectIds: number[]) {
        return await this.repository.findByIds(projectIds);
    }
}
