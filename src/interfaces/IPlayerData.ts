import { IControl } from "./IControl";
import { ICircleBody } from "./ICircleBody";

export interface IPlayerData{
    name: string,
    controls: Array<IControl>,
    body: ICircleBody
}