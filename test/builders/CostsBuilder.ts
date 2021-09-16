import {Costs} from "../../src/models/Costs";

export class CostsBuilder {
    private id!: number;
    private amount!: string;
    private projectId!: number;
    private costTypeId!: number;

    private constructor() {
    }

    public static withDefaults(): CostsBuilder {
        return new CostsBuilder()
            .withId(1)
            .withCostTypeId(1)
            .withAmount("100.100010")
            .withProjectId(1)
    }

    public withId(id: number): CostsBuilder {
        this.id = id;
        return this;
    }

    public withCostTypeId(costTypeId: number): CostsBuilder {
        this.costTypeId = costTypeId;
        return this;
    }

    public withProjectId(projectId: number): CostsBuilder {
        this.projectId = projectId;
        return this;
    }

    public withAmount(amount: string): CostsBuilder {
        this.amount = amount;
        return this;
    }

    public build(): Costs {
        return new Costs(this.id, this.amount, this.projectId, this.costTypeId);
    }
}
