import {suite, test} from '@testdeck/mocha';
import {BaseRepositorySpec} from './BaseRepository.spec';
import {expect} from 'chai';
import {ProjectsRepository} from "../../src/repositories/ProjectsRepository";
import {Projects} from "../../src/models/Projects";
import {ProjectsBuilder} from "../builders/ProjectsBuilder";
import {Repository} from "typeorm";

@suite
export class ProjectsRepositorySpec extends BaseRepositorySpec {
    private projectsRepository!: ProjectsRepository;
    private repository!: Repository<Projects>;

    public async before(): Promise<void> {
        await super.beforeEach();
        this.projectsRepository = new ProjectsRepository(this.connection.getRepository(Projects));
        this.repository = this.connection.getRepository(Projects);
    }


    @test
    public async shouldGetAllProjects(): Promise<void> {
        const firstProject = ProjectsBuilder.withDefaults().withId(1).build();
        await this.repository.save(firstProject);
        const secondProject = ProjectsBuilder.withDefaults().withId(2).build();
        await this.repository.save(secondProject);

        const actual = await this.projectsRepository.findAll();

        expect(actual).to.deep.equals([firstProject, secondProject]);
    }

    // TODO: flaky test
    @test
    public async shouldGetProjectById(): Promise<void> {
        const project = ProjectsBuilder.withDefaults().withId(3).build();
        await this.repository.save(project);

        const actual = await this.projectsRepository.findById(project.id);

        expect(actual).to.deep.equals(project);
    }

    @test
    public async shouldGetProjectByClientId(): Promise<void> {
        const clientId = 1;
        const firstProject = ProjectsBuilder.withDefaults().withId(3).withClientId(clientId).build();
        const secondProject = ProjectsBuilder.withDefaults().withId(4).withClientId(clientId).build();
        await this.repository.save(firstProject);
        await this.repository.save(secondProject);

        const actual = await this.projectsRepository.findByClientId(clientId);

        expect(actual).to.deep.equals([firstProject, secondProject]);
    }

}
