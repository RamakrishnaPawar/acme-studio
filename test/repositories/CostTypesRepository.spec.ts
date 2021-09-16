import {suite, test} from '@testdeck/mocha';
import {BaseRepositorySpec} from './BaseRepository.spec';
import {expect} from 'chai';
import {CostTypes} from "../../src/models/CostTypes";
import {CostTypesRepository} from "../../src/repositories/CostTypesRepository";
import {CostTypesBuilder} from "../builders/CostTypesBuilder";
import {Repository} from "typeorm";

@suite
export class CostTypesRepositorySpec extends BaseRepositorySpec {
    private costTypesRepository!: CostTypesRepository;
    private repository!: Repository<CostTypes>;

    public async before(): Promise<void> {
        await super.beforeEach();
        this.costTypesRepository = new CostTypesRepository(this.connection.getRepository(CostTypes));
        this.repository =  this.connection.getRepository(CostTypes);
    }

    @test
    public async shouldGetAllCostTypes(): Promise<void> {
        const firstCostType = CostTypesBuilder.withDefaults().withId(1).build();
        await this.repository.save(firstCostType);
        const secondCostType = CostTypesBuilder.withDefaults().withId(2).build();
        await this.repository.save(secondCostType);

        const actual = await this.costTypesRepository.findAll();

        expect(actual).to.deep.equals([firstCostType, secondCostType]);
    }

    @test
    public async shouldGetCostTypeById(): Promise<void> {
        const costType = CostTypesBuilder.withDefaults().build();
        await this.repository.save(costType);

        const actual = await this.costTypesRepository.findById(costType.id);

        expect(actual).to.deep.equals(costType);
    }

    @test
    public async shouldGetCostTypesByParentId(): Promise<void> {
        const parentId = 1;
        const firstCostType = CostTypesBuilder.withDefaults().withId(1).withParentId(parentId).build();
        const secondCostType = CostTypesBuilder.withDefaults().withId(2).withParentId(parentId).build();
        const thirdCostType = CostTypesBuilder.withDefaults().withId(3).withParentId(2).build();
        await this.repository.save(firstCostType);
        await this.repository.save(secondCostType);
        await this.repository.save(thirdCostType);

        const actual = await this.costTypesRepository.findByParentId(parentId);

        expect(actual).to.deep.equals([firstCostType, secondCostType]);
    }
}
