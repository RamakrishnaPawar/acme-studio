import {instance, mock, verify, when} from "ts-mockito";
import {expect} from "chai"
import {suite, test} from '@testdeck/mocha';
import {CostTypesService} from "../../src/services/CostTypesService";
import {CostTypesRepository} from "../../src/repositories/CostTypesRepository";
import {CostTypesBuilder} from "../builders/CostTypesBuilder";

@suite
export class CostTypesServiceSpec {
    private costTypesService!: CostTypesService;
    private costTypesRepository!: CostTypesRepository;

    public before(): void {
        this.costTypesRepository = mock(CostTypesRepository);
        this.costTypesService = new CostTypesService(instance(this.costTypesRepository));
    }

    @test
    public async shouldGetAllCostTypes(): Promise<void> {
        const costTypes = [CostTypesBuilder.withDefaults().build(), CostTypesBuilder.withDefaults().build()];
        when(this.costTypesRepository.findAll()).thenResolve(costTypes)

        const actual = await this.costTypesService.getAll();

        verify(this.costTypesRepository.findAll()).once();
        expect(actual).deep.equals(costTypes);
    }


    @test
    public async shouldGetCostTypeById(): Promise<void> {
        const costType = CostTypesBuilder.withDefaults().withId(1).build();
        when(this.costTypesRepository.findById(costType.id)).thenResolve(costType)

        const actual = await this.costTypesService.getById(costType.id);

        verify(this.costTypesRepository.findById(costType.id)).once();
        expect(actual).deep.equals(costType);
    }

    @test
    public async shouldGetCostTypeByParentId(): Promise<void> {
        const parentId = 1;
        const costType = CostTypesBuilder.withDefaults().withId(1).withParentId(parentId).build();
        when(this.costTypesRepository.findByParentId(costType.parentId)).thenResolve([costType])

        const actual = await this.costTypesService.getByParentId(costType.parentId);

        verify(this.costTypesRepository.findByParentId(costType.parentId)).once();
        expect(actual).deep.equals([costType]);
    }
}
