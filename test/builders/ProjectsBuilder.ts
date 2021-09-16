import {Projects} from "../../src/models/Projects";

export class ProjectsBuilder {
    private id!: number;
    private title!: string;
    private clientId!: number;

    private constructor() {
    }

    public static withDefaults(): ProjectsBuilder {
        return new ProjectsBuilder()
            .withId(1)
            .withTitle('name')
            .withClientId(1)
    }

    public withId(id: number): ProjectsBuilder {
        this.id = id;
        return this;
    }

    public withTitle(title: string): ProjectsBuilder {
        this.title = title;
        return this;
    }

    public withClientId(clientId: number): ProjectsBuilder {
        this.clientId = clientId;
        return this;
    }

    public build(): Projects {
        return new Projects(this.id, this.title, this.clientId);
    }
}
