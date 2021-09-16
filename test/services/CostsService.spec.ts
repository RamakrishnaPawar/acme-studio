import {instance, mock, verify, when} from "ts-mockito";
import {expect} from "chai"
import {suite, test} from '@testdeck/mocha';
import {CostsService} from "../../src/services/CostsService";
import {CostsRepository} from "../../src/repositories/CostsRepository";
import {CostsBuilder} from "../builders/CostsBuilder";

@suite
export class CostsServiceSpec {
    private costsService!: CostsService;
    private costsRepository!: CostsRepository;

    public before(): void {
        this.costsRepository = mock(CostsRepository);
        this.costsService = new CostsService(instance(this.costsRepository));
    }

    @test
    public async shouldGetAllCosts(): Promise<void> {
        const costs = [CostsBuilder.withDefaults().build(), CostsBuilder.withDefaults().build()];
        when(this.costsRepository.findAll()).thenResolve(costs)

        const actual = await this.costsService.getAll();

        verify(this.costsRepository.findAll()).once();
        expect(actual).deep.equals(costs);
    }


    @test
    public async shouldGetCostById(): Promise<void> {
        const costs = CostsBuilder.withDefaults().withId(1).build();
        when(this.costsRepository.findById(costs.id)).thenResolve(costs)

        const actual = await this.costsService.getById(costs.id);

        verify(this.costsRepository.findById(costs.id)).once();
        expect(actual).deep.equals(costs);
    }

    @test
    public async shouldGetCostByProjectId(): Promise<void> {
        const projectId = 1;
        const firstCost = CostsBuilder.withDefaults().withId(1).withProjectId(projectId).build();
        const secondCost = CostsBuilder.withDefaults().withId(2).withProjectId(projectId).build();
        when(this.costsRepository.findByProjectId(projectId)).thenResolve([firstCost, secondCost])

        const actual = await this.costsService.getByProjectId(projectId);

        verify(this.costsRepository.findByProjectId(projectId)).once();
        expect(actual).deep.equals([firstCost, secondCost]);
    }
}
