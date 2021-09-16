import {injectable} from "inversify";
import {ClientsRepository} from "../repositories/ClientsRepository";
import {Clients} from "../models/Clients";

@injectable()
export class ClientsService {
    private readonly clientsRepository: ClientsRepository;

    constructor(clientsRepository: ClientsRepository) {
        this.clientsRepository = clientsRepository;
    }

    public async getAll(): Promise<Clients[]> {
        return await this.clientsRepository.findAll();
    }

    public async getByIds(ids: number[]): Promise<Clients[]> {
        return  await this.clientsRepository.findByIds(ids);
    }
}
