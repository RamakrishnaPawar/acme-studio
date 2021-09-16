import {suite, test} from '@testdeck/mocha';
import {BaseRepositorySpec} from './BaseRepository.spec';
import {expect} from 'chai';
import {CostsRepository} from "../../src/repositories/CostsRepository";
import {Costs} from "../../src/models/Costs";
import {CostsBuilder} from "../builders/CostsBuilder";
import {Repository} from "typeorm";

@suite
export class CostsRepositorySpec extends BaseRepositorySpec {
    private costsRepository!: CostsRepository;
    private repository!: Repository<Costs>;

    public async before(): Promise<void> {
        await super.beforeEach();
        this.costsRepository = new CostsRepository(this.connection.getRepository(Costs));
        this.repository = this.connection.getRepository(Costs);
    }

    @test
    public async shouldGetAllCostTypes(): Promise<void> {
        const firstCost = CostsBuilder.withDefaults().withId(1).build();
        await this.repository.save(firstCost);
        const secondCost = CostsBuilder.withDefaults().withId(2)
            .withProjectId(2).build();
        await this.repository.save(secondCost);

        const actual = await this.costsRepository.findAll();

        expect(actual).to.deep.equals([firstCost, secondCost]);
    }

    @test
    public async shouldGetCostById(): Promise<void> {
        const cost = CostsBuilder.withDefaults().withId(5).build();
        await this.repository.save(cost);

        const actual = await this.costsRepository.findById(cost.id);

        expect(actual).to.deep.equals(cost);
    }

    @test
    public async shouldGetCostByProjectId(): Promise<void> {
        const projectId = 1;
        const firstCost = CostsBuilder.withDefaults().withProjectId(projectId).withId(1).build();
        const secondCost = CostsBuilder.withDefaults().withProjectId(projectId).withId(2).build();
        await this.repository.save(firstCost);
        await this.repository.save(secondCost);

        const actual = await this.costsRepository.findByProjectId(projectId);

        expect(actual).to.deep.equals([firstCost, secondCost]);
    }
}
