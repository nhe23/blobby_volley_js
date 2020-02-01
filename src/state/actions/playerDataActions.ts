import {IPlayerControlAction, IPlayerColorAction} from './IPlayerDataAction';
import {PlayerDataActions} from "./PlayerDataActionsEnum";

export const changeControl = (playerName: string, control:string, newKey:string):IPlayerControlAction => {
    return {
        type: PlayerDataActions.CHANGE_CONTROL,
        payload: {playerName, control, newKey}
    }
}


export const changeColor = (playerName: string, color:string):IPlayerColorAction => {
    return {
        type: PlayerDataActions.CHANGE_COLOR,
        payload: {playerName, color}
    }
}
