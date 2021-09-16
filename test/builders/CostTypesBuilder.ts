import {CostTypes} from "../../src/models/CostTypes";

export class CostTypesBuilder {
    private id!: number;
    private name!: string;
    private parentId!: number;

    private constructor() {
    }

    public static withDefaults(): CostTypesBuilder {
        return new CostTypesBuilder()
            .withId(1)
            .withName("100.100010")
            .withParentId(1)
    }

    public withId(id: number): CostTypesBuilder {
        this.id = id;
        return this;
    }


    public withParentId(parentId: number): CostTypesBuilder {
        this.parentId = parentId;
        return this;
    }

    public withName(name: string): CostTypesBuilder {
        this.name = name;
        return this;
    }

    public build(): CostTypes {
        return new CostTypes(this.id, this.name, this.parentId);
    }
}
