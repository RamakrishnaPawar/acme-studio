import {injectable} from "inversify";
import {CostTypesRepository} from "../repositories/CostTypesRepository";
import {CostTypes} from "../models/CostTypes";

@injectable()
export class CostTypesService {
    private readonly costTypesRepository: CostTypesRepository;

    constructor(costTypesRepository: CostTypesRepository) {
        this.costTypesRepository = costTypesRepository;
    }

    public async getAll(): Promise<CostTypes[] | undefined> {
        return await this.costTypesRepository.findAll();
    }

    // TODO: Handle entity error with custom exception
    public async getById(id: number): Promise<CostTypes> {
        const costType = await this.costTypesRepository.findById(id);
        if (costType === undefined)
            throw new Error()
        return costType
    }

    public async getByParentId(costTypeId: number): Promise<CostTypes[]> {
        return await this.costTypesRepository.findByParentId(costTypeId);
    }
}
