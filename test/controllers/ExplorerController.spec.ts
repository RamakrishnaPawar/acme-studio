import {instance, mock, when} from "ts-mockito";
import {suite, test} from '@testdeck/mocha';
import {ExplorerService} from "../../src/services/ExplorerService";
import {ExplorerController} from "../../src/controllers/ExplorerController";
import {expect} from 'chai'
import httpMocks = require('node-mocks-http');
import {CostExplorerOutput} from "../../src/dtos/CostExplorerOutput";

@suite
export class ExplorerControllerSpec {
    private explorerController!: ExplorerController;
    private explorerService!: ExplorerService;

    public before(): void {
        this.explorerService = mock(ExplorerService);
        this.explorerController = new ExplorerController(instance(this.explorerService));
    }

    @test
    public async shouldGetAllExplorer(): Promise<void> {
        const result = {
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
        } as CostExplorerOutput;
        const response = httpMocks.createResponse();
        when(this.explorerService.getCostExplorer()).thenResolve(result)

        await this.explorerController.getExplorerBy(undefined, response);

        expect(response._isEndCalled()).to.be.true;
        expect(response._getStatusCode()).to.be.equal(200);
        expect(response._getData()).to.deep.equal(JSON.stringify(result));

    }

    @test
    public async shouldGetAllExplorerByClientId(): Promise<void> {
        const clientId = [1];
        const result = {
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
        } as CostExplorerOutput;
        const response = httpMocks.createResponse();
        when(this.explorerService.getByClientIds(clientId)).thenResolve(result)

        await this.explorerController.getExplorerBy(clientId, response);

        expect(response._isEndCalled()).to.be.true;
        expect(response._getStatusCode()).to.be.equal(200);
        expect(response._getData()).to.deep.equal(JSON.stringify(result));
    }
}
