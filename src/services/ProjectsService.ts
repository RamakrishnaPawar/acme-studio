import {injectable} from "inversify";
import {ProjectsRepository} from "../repositories/ProjectsRepository";
import {Projects} from "../models/Projects";

@injectable()
export class ProjectsService {
    private readonly projectsRepository: ProjectsRepository;

    constructor(projectsRepository: ProjectsRepository) {
        this.projectsRepository = projectsRepository;
    }

    public async getAll(): Promise<Projects[] | undefined> {
        return await this.projectsRepository.findAll();
    }

    public async getById(id: number): Promise<Projects | undefined> {
        return await this.projectsRepository.findById(id);
    }

    public async getByClientId(clientId: number): Promise<Projects[]> {
        return await this.projectsRepository.findByClientId(clientId);
    }

    public async getByIds(projectIds: number[]) {
        return await this.projectsRepository.findByIds(projectIds);
    }
}
