import {AsyncContainerModule, ContainerModule} from "inversify";
import '../controllers/ExplorerController';

export class ControllerModule extends AsyncContainerModule {
    constructor() {
        super(async () => {
        });

    }

}
