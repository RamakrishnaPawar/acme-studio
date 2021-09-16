import {controller, httpGet, queryParam, request, response} from "inversify-express-utils";
import {Request, Response} from "express";
import {ExplorerService} from "../services/ExplorerService";

@controller('/explorer')
export class ExplorerController {
    private readonly explorerService: ExplorerService;


    constructor(explorerService: ExplorerService) {
        this.explorerService = explorerService;
    }


    @httpGet('')
    public async getExplorerBy(@queryParam('client_id') clientId: number[] | undefined,
                               @response() res: Response): Promise<void> {
        if (clientId) {
            res.status(200).json(await this.explorerService.getByClientIds(clientId));
        } else {
            res.status(200).json(await this.explorerService.getCostExplorer());
        }
    }
}

