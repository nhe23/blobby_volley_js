import {IPlayerControlAction} from './IPlayerDataAction';
import {PlayerDataActions} from "./PlayerDataActionsEnum";

export const changeControl = (playerName: string, control:string, newKey:string):IPlayerControlAction => {
    return {
        type: PlayerDataActions.CHANGE_CONTROL,
        payload: {playerName, control, newKey}
    }
}


