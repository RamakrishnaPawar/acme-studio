import {suite, test} from '@testdeck/mocha';
import {BaseRepositorySpec} from './BaseRepository.spec';
import {ClientsRepository} from "../../src/repositories/ClientsRepository";
import {Clients} from "../../src/models/Clients";
import {expect} from 'chai';
import {ClientsBuilder} from "../builders/ClientsBuilder";
import {Repository} from "typeorm";

@suite
export class ClientsRepositorySpec extends BaseRepositorySpec {
    private clientsRepository!: ClientsRepository;
    private repository!: Repository<Clients>

    public async before(): Promise<void> {
        await super.beforeEach();
        this.clientsRepository = new ClientsRepository(this.connection.getRepository(Clients));
        this.repository = this.connection.getRepository(Clients);
    }


    @test
    public async shouldGetAllClients(): Promise<void> {
        const firstClient = ClientsBuilder.withDefaults().withId(1).build();
        await this.repository.save(firstClient);
        const secondClient = ClientsBuilder.withDefaults().withId(2).build();
        await this.repository.save(secondClient);

        const actual = await this.clientsRepository.findAll();

        expect(actual).to.deep.equals([firstClient, secondClient]);
    }

    @test
    public async shouldGetClientById(): Promise<void> {
        const client = ClientsBuilder.withDefaults().build();
        await this.repository.save(client);

        const actual = await this.clientsRepository.findById(client.id);

        expect(actual).to.deep.equals(client);
    }

    @test
    public async shouldGetClientByIds(): Promise<void> {
        const firstClient = ClientsBuilder.withDefaults().withId(1).build();
        await this.repository.save(firstClient);
        const secondClient = ClientsBuilder.withDefaults().withId(2).build();
        await this.repository.save(secondClient);

        const actual = await this.clientsRepository.findByIds([firstClient.id, secondClient.id]);

        expect(actual).to.deep.equals([firstClient,secondClient]);
    }
}
