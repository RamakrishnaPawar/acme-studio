import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: "projects"})
export class Projects {


    constructor(id: number, title: string, clientId: number) {
        this.id = id;
        this.title = title;
        this.clientId = clientId;
    }

    @PrimaryColumn()
    public id!: number;
    @Column()
    public title!: string;
    @Column({name: "client_id"})
    public clientId!: number;
}
