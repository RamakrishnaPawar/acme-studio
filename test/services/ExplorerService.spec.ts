import {suite, test} from '@testdeck/mocha';
import {ExplorerService} from "../../src/services/ExplorerService";
import {ClientsService} from "../../src/services/ClientsService";
import {CostsService} from "../../src/services/CostsService";
import {CostTypesService} from "../../src/services/CostTypesService";
import {ProjectsService} from "../../src/services/ProjectsService";
import {deepEqual, instance, mock, when} from "ts-mockito";
import {Clients} from "../../src/models/Clients";
import {Projects} from "../../src/models/Projects";
import {Costs} from "../../src/models/Costs";
import {CostTypes} from "../../src/models/CostTypes";
import {expect} from 'chai';

@suite
export class ExplorerServiceSpec {
    private explorerService!: ExplorerService;
    private clientsService!: ClientsService;
    private costsService!: CostsService;
    private costTypesService!: CostTypesService;
    private projectsService!: ProjectsService;

    public before(): void {
        this.clientsService = mock(ClientsService);
        this.costTypesService = mock(CostTypesService);
        this.costsService = mock(CostsService);
        this.projectsService = mock(ProjectsService);

        this.explorerService = new ExplorerService(instance(this.clientsService), instance(this.projectsService),
            instance(this.costsService), instance(this.costTypesService))
    }

    @test
    public async shouldGetExplorer(): Promise<void> {
        when(this.clientsService.getAll()).thenResolve(this.allClients())
        when(this.projectsService.getByClientId(this.allClients()[0].id)).thenResolve(this.projectByClientId())
        when(this.costsService.getByProjectId(this.projectByClientId()[0].id)).thenResolve(this.costsByProjectId())
        when(this.costTypesService.getByParentId(this.costsByProjectId()[0].costTypeId)).thenResolve(this.costTypeByParentId())
        when(this.costTypesService.getById(this.costsByProjectId()[0].costTypeId)).thenResolve(this.costTypeById());
        when(this.costTypesService.getByParentId(this.costTypeByParentId()[0].id)).thenResolve(this.costTypeChildOfParentIdThree())
            .thenResolve([]);
        when(this.costTypesService.getByParentId(this.costTypeByParentId()[1].id)).thenResolve([]);

        const actual = await this.explorerService.getCostExplorer();

        const expected = {
            "data": [
                {
                    "id": 1,
                    "name": "Scelerisque Neque Limited",
                    "amount": 15514.44,
                    "type": "client",
                    "children": [
                        {
                            "id": 10,
                            "name": "tristique senectus",
                            "amount": 15514.44,
                            "type": "project",
                            "children": [
                                {
                                    "id": 1,
                                    "type": "cost",
                                    "name": "Design",
                                    "amount": 15514.44,
                                    "children": [
                                        {
                                            "id": 3,
                                            "type": "cost",
                                            "name": "Digital Design",
                                            "amount": 7461.54,
                                            "children": [
                                                {
                                                    "id": 5,
                                                    "type": "cost",
                                                    "name": "Web Design",
                                                    "amount": 3620.45,
                                                    "children": []
                                                },
                                                {
                                                    "id": 6,
                                                    "type": "cost",
                                                    "name": "App Design",
                                                    "amount": 3841.09,
                                                    "children": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": 4,
                                            "type": "cost",
                                            "name": "Print Design",
                                            "amount": 8052.9,
                                            "children": []
                                        }
                                    ]
                                }]
                        }]
                }]
        }
        expect(actual).deep.equals(expected);
    }

    @test
    public async shouldGetExplorerByClients(): Promise<void> {
        when(this.clientsService.getByIds(deepEqual([this.allClients()[0].id]))).thenResolve(this.allClients())
        when(this.projectsService.getByClientId(this.allClients()[0].id)).thenResolve(this.projectByClientId())
        when(this.costsService.getByProjectId(this.projectByClientId()[0].id)).thenResolve(this.costsByProjectId())
        when(this.costTypesService.getByParentId(this.costsByProjectId()[0].costTypeId)).thenResolve(this.costTypeByParentId())
        when(this.costTypesService.getById(this.costsByProjectId()[0].costTypeId)).thenResolve(this.costTypeById());
        when(this.costTypesService.getByParentId(this.costTypeByParentId()[0].id)).thenResolve(this.costTypeChildOfParentIdThree())
            .thenResolve([]);
        when(this.costTypesService.getByParentId(this.costTypeByParentId()[1].id)).thenResolve([]);

        const actual = await this.explorerService.getByClientIds([1]);

        const expected = {
            "data": [
                {
                    "id": 1,
                    "name": "Scelerisque Neque Limited",
                    "amount": 15514.44,
                    "type": "client",
                    "children": [
                        {
                            "id": 10,
                            "name": "tristique senectus",
                            "amount": 15514.44,
                            "type": "project",
                            "children": [
                                {
                                    "id": 1,
                                    "type": "cost",
                                    "name": "Design",
                                    "amount": 15514.44,
                                    "children": [
                                        {
                                            "id": 3,
                                            "type": "cost",
                                            "name": "Digital Design",
                                            "amount": 7461.54,
                                            "children": [
                                                {
                                                    "id": 5,
                                                    "type": "cost",
                                                    "name": "Web Design",
                                                    "amount": 3620.45,
                                                    "children": []
                                                },
                                                {
                                                    "id": 6,
                                                    "type": "cost",
                                                    "name": "App Design",
                                                    "amount": 3841.09,
                                                    "children": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": 4,
                                            "type": "cost",
                                            "name": "Print Design",
                                            "amount": 8052.9,
                                            "children": []
                                        }
                                    ]
                                }]
                        }]
                }]
        }
        expect(actual).deep.equals(expected);
    }

    private allClients(): Clients[] {
        return [new Clients(1, "Scelerisque Neque Limited")]
    }

    private projectByClientId(): Projects[] {
        return [new Projects(10, "tristique senectus", 1)]
    }

    private costsByProjectId(): Costs[] {
        return [new Costs(481, "15514.440000", 10, 1),
            new Costs(73, "3620.450000", 10, 5),
            new Costs(74, "3841.090000", 10, 6),
            new Costs(364, "7461.540000", 10, 3),
            new Costs(75, "8052.900000", 10, 4)]
    }

    private costTypeByParentId(): CostTypes[] {
        return [new CostTypes(3, "Digital Design", 1), new CostTypes(4, "Print Design", 1)]
    }

    private costTypeById(): CostTypes {
        return new CostTypes(1, "Design", 9)
    }

    private costTypeChildOfParentIdThree(): CostTypes[] {
        return [new CostTypes(5, "Web Design", 3), new CostTypes(6, "App Design", 3)];
    }
}
