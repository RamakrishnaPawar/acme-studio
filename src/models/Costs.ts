import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: "costs"})
export class Costs {

    constructor(id: number, amount: string, projectId: number, costTypeId: number) {
        this.id = id;
        this.amount = amount;
        this.projectId = projectId;
        this.costTypeId = costTypeId;
    }

    @PrimaryColumn()
    public id: number;
    @Column()
    public amount: string;
    @Column({name: "project_id"})
    public projectId: number;
    @Column({name: "cost_type_id"})
    public costTypeId: number;
}
