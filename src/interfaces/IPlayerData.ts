import { IControl } from "./IControl";
import { ICircleBody } from "./ICircleBody";

export interface IPlayerData{
    name: string,
    isLeftPlayer: boolean,
    controls: Array<IControl>,
    body: ICircleBody,
}

export interface IPlayerControl{
    name: string,
    controls: Array<IControl>
}