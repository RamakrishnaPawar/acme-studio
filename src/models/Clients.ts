import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: "clients"})
export class Clients {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    @PrimaryColumn()
    public id: number;
    @Column()
    public name: string;
}
