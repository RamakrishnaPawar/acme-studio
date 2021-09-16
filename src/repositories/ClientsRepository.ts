import {Repository} from "typeorm";
import {Clients} from "../models/Clients";
import {inject, injectable} from "inversify";
import {TYPE} from "../constants/Type";


@injectable()
export class ClientsRepository {
    private readonly repository: Repository<Clients>;

    constructor(@inject(TYPE.ClientsRepository) repository: Repository<Clients>) {
        this.repository = repository;
    }

    public async findAll(): Promise<Clients[]> {
        return await this.repository.find();
    }

    public async findById(id: number): Promise<Clients | undefined> {
        return await this.repository.findOne({id: id});
    }

    public async findByIds(ids: number[]): Promise<Clients[]> {
        return await this.repository.findByIds(ids);
    }

}
