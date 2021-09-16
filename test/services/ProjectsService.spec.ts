import {instance, mock, verify, when} from "ts-mockito";
import {expect} from "chai"
import {suite, test} from '@testdeck/mocha';
import {ProjectsService} from "../../src/services/ProjectsService";
import {ProjectsRepository} from "../../src/repositories/ProjectsRepository";
import {ProjectsBuilder} from "../builders/ProjectsBuilder";

@suite
export class ProjectsServiceSpec {
    private projectsService!: ProjectsService;
    private projectsRepository!: ProjectsRepository;

    public before(): void {
        this.projectsRepository = mock(ProjectsRepository);
        this.projectsService = new ProjectsService(instance(this.projectsRepository));
    }

    @test
    public async shouldGetAllProjects(): Promise<void> {
        const projects = [ProjectsBuilder.withDefaults().build(), ProjectsBuilder.withDefaults().build()];
        when(this.projectsRepository.findAll()).thenResolve(projects)

        const actual = await this.projectsService.getAll();

        verify(this.projectsRepository.findAll()).once();
        expect(actual).deep.equals(projects);
    }


    @test
    public async shouldGetProjectById(): Promise<void> {
        const project = ProjectsBuilder.withDefaults().withId(1).build();
        when(this.projectsRepository.findById(project.id)).thenResolve(project)

        const actual = await this.projectsService.getById(project.id);

        verify(this.projectsRepository.findById(project.id)).once();
        expect(actual).deep.equals(project);
    }

    @test
    public async shouldProjectByClientId(): Promise<void> {
        const project = ProjectsBuilder.withDefaults().withClientId(1).build();
        when(this.projectsRepository.findById(project.clientId)).thenResolve(project)

        const actual = await this.projectsService.getById(project.clientId);

        verify(this.projectsRepository.findById(project.clientId)).once();
        expect(actual).deep.equals(project);
    }
}
