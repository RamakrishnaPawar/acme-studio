import {Type} from "../models/Type";

export interface ExplorerItem {
    id:number;
    name: string;
    amount: number;
    type: Type;
    children: ExplorerItem [];
}
