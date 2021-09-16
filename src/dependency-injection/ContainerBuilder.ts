import {Container} from 'inversify';
import {ControllerModule} from './ControllerModule'
import {bindings} from "./DbModule";

export class ContainerBuilder {
    public static async build(): Promise<Container> {
        const container = new Container({autoBindInjectable: true});
        await container.loadAsync(new ControllerModule(), bindings);
        return container;
    }
}
