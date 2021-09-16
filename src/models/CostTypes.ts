import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: "cost_types"})
export class CostTypes {


    constructor(id: number, name: string, parentId: number) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
    }

    @PrimaryColumn()
    public id!: number;
    @Column()
    public name!: string;
    @Column({name: "parent_id"})
    public parentId: number;
}
