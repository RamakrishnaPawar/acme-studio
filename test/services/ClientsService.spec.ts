import {ClientsService} from "../../src/services/ClientsService";
import {ClientsRepository} from "../../src/repositories/ClientsRepository";
import {deepEqual, instance, mock, verify, when} from "ts-mockito";
import {ClientsBuilder} from "../builders/ClientsBuilder";
import {expect} from "chai"
import {suite, test} from '@testdeck/mocha';

@suite
export class ClientsServiceSpec {
    private clientsService!: ClientsService;
    private clientsRepository!: ClientsRepository;

    public before(): void {
        this.clientsRepository = mock(ClientsRepository);
        this.clientsService = new ClientsService(instance(this.clientsRepository));
    }

    @test
    public async shouldGetAllClients(): Promise<void> {
        const clients = [ClientsBuilder.withDefaults().build(), ClientsBuilder.withDefaults().build()];
        when(this.clientsRepository.findAll()).thenResolve(clients)

        const actual = await this.clientsService.getAll();

        verify(this.clientsRepository.findAll()).once();
        expect(actual).deep.equals(clients);
    }


    @test
    public async shouldGetClientByIds(): Promise<void> {
        const firstClient = ClientsBuilder.withDefaults().withId(1).build();
        const secondClient = ClientsBuilder.withDefaults().withId(12).build();
        when(this.clientsRepository.findByIds(deepEqual([firstClient.id,secondClient.id]))).thenResolve([firstClient,secondClient])

        const actual = await this.clientsService.getByIds([firstClient.id,secondClient.id]);

        verify(this.clientsRepository.findByIds(deepEqual([firstClient.id,secondClient.id]))).once();
        expect(actual).deep.equals([firstClient,secondClient]);
    }
}
