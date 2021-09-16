import {injectable} from "inversify";
import {ClientsService} from "./ClientsService";
import {ProjectsService} from "./ProjectsService";
import {CostsService} from "./CostsService";
import {CostTypesService} from "./CostTypesService";
import {CostExplorerOutput} from "../dtos/CostExplorerOutput";
import {Type} from "../models/Type";
import {Clients} from "../models/Clients";


@injectable()
export class ExplorerService {
    private readonly clientsService: ClientsService;
    private readonly projectsService: ProjectsService;
    private readonly costsService: CostsService;
    private readonly costTypeService: CostTypesService;

    constructor(clientsService: ClientsService, projectService: ProjectsService,
                costsService: CostsService, costTypeService: CostTypesService) {
        this.clientsService = clientsService;
        this.projectsService = projectService;
        this.costsService = costsService;
        this.costTypeService = costTypeService;
    }

    public async getCostExplorer(): Promise<CostExplorerOutput> {
        const clients = await this.clientsService.getAll();
        return await this.getCostExplorerByClients(clients);
    }

    private async getCostExplorerByClients(clients: Clients[]): Promise<CostExplorerOutput> {
        let costExplorerOutput: CostExplorerOutput = {data: []};
        for (let clientIndex = 0; clientIndex < clients.length; clientIndex++) {
            const client = clients[clientIndex];
            costExplorerOutput.data.push({
                id: client.id,
                name: client.name,
                amount: 0,
                type: Type.client,
                children: []
            });
            const projects = await this.projectsService.getByClientId(client.id);
            for (let projectIndex = 0; projectIndex < projects.length; projectIndex++) {
                let projectAmount = 0;
                const project = projects[projectIndex];
                let costs = await this.costsService.getByProjectId(project.id);
                costExplorerOutput.data[clientIndex].children.push({
                    id: project.id, // 10
                    name: project.title,
                    amount: 0,
                    type: Type.project,
                    children: []
                });
                let processedCostIds: number[] = [];
                for (let costIndex = 0; costIndex < costs.length; costIndex++) {
                    const cost = costs[costIndex];
                    if (processedCostIds.find(id => id === cost.costTypeId)) {
                        continue;
                    }
                    const parentCostTypes = await this.costTypeService.getByParentId(cost.costTypeId);
                    if (!(parentCostTypes && parentCostTypes.length !== 0))
                        continue;
                    const costType = await this.costTypeService.getById(cost.costTypeId);
                    const amount = costs.find(cost => cost.projectId === project.id && cost.costTypeId === costType.id)!.amount;
                    costExplorerOutput.data[clientIndex].children[projectIndex].children
                        .push({
                            id: costType.id,
                            type: Type.cost,
                            name: costType.name,
                            amount: parseFloat(amount),
                            children: []
                        })
                    projectAmount += parseFloat(amount);
                    if (parentCostTypes.length > 0) {
                        for (let parentCostTypeIndex = 0; parentCostTypeIndex < parentCostTypes.length; parentCostTypeIndex++) {
                            const parentCostType = parentCostTypes[parentCostTypeIndex];
                            processedCostIds.push(parentCostType.id);
                            const cost = costs.find(cost => cost.projectId === project.id && cost.costTypeId === parentCostType.id);
                            const childOfParentCostTypes = await this.costTypeService.getByParentId(parentCostType.id);
                            costExplorerOutput.data[clientIndex].children[projectIndex].children[costIndex]
                                .children.push({
                                id: parentCostType.id,
                                type: Type.cost,
                                name: parentCostType.name,
                                amount: parseFloat(cost!.amount),
                                children: []
                            })
                            if (childOfParentCostTypes.length > 0) {
                                for (let childOfParentCostTypeIndex = 0; childOfParentCostTypeIndex < childOfParentCostTypes.length; childOfParentCostTypeIndex++) {
                                    const childOfParentCostType = childOfParentCostTypes[childOfParentCostTypeIndex]; // 5
                                    const cost = costs.find(cost => cost.projectId === project.id && cost.costTypeId === childOfParentCostType.id);
                                    processedCostIds.push(childOfParentCostType.id);
                                    costExplorerOutput.data[clientIndex].children[projectIndex].children[costIndex]
                                        .children[parentCostTypeIndex].children.push(
                                        {
                                            id: childOfParentCostType.id,
                                            type: Type.cost,
                                            name: childOfParentCostType.name,
                                            amount: parseFloat(cost!.amount),
                                            children: []
                                        })
                                }
                            }

                        }
                    }
                }
                costExplorerOutput.data[clientIndex].children[projectIndex].amount = projectAmount;
                costExplorerOutput.data[clientIndex].amount += projectAmount;
            }
        }
        return costExplorerOutput;
    }


    public async getByClientIds(clientIds: number[]) {
        const clients = await this.clientsService.getByIds(clientIds);
        return await this.getCostExplorerByClients(clients);
    }
}
