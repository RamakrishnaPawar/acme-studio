import {Clients} from "../../src/models/Clients";

export class ClientsBuilder {
    private id!: number;
    private name!: string;

    private constructor() {
    }

    public static withDefaults(): ClientsBuilder {
        return new ClientsBuilder()
            .withId(1)
            .withName('name')
    }

    public withId(id: number): ClientsBuilder {
        this.id = id;
        return this;
    }

    public withName(name: string): ClientsBuilder {
        this.name = name;
        return this;
    }

    public build(): Clients {
        return new Clients(this.id, this.name);
    }
}
