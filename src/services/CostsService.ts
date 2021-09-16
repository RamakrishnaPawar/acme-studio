import {injectable} from "inversify";
import {CostsRepository} from "../repositories/CostsRepository";
import {Costs} from "../models/Costs";

@injectable()
export class CostsService {
    private readonly costsRepository: CostsRepository;

    constructor(costsRepository: CostsRepository) {
        this.costsRepository = costsRepository;
    }

    public async getAll(): Promise<Costs[] | undefined> {
        return await this.costsRepository.findAll();
    }

    public async getById(id: number): Promise<Costs | undefined> {
        return await this.costsRepository.findById(id);
    }

    public async getByProjectId(projectId: number): Promise<Costs[]> {
        return await this.costsRepository.findByProjectId(projectId);
    }

    public async getByCostTypeIds(costTypeIds: number[]) :Promise<Costs[]>{
        return await this.costsRepository.findByCostTypeIds(costTypeIds);
    }
}
