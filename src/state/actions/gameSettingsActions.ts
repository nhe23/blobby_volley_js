import {IGameStateSettingsActions} from './IGameStateSettingActions';
import {GameSettingsActions} from "./GameSettingsActionsEnum";

export const changeGameSpeed = (gameSpeedFactor:number):IGameStateSettingsActions => {
    return {
        type: GameSettingsActions.CHANGE_GAME_SPEED,
        payload: {gameSpeedFactor}
    }
}

export const setSoundActivated = ():IGameStateSettingsActions => {
    return {
        type: GameSettingsActions.SET_SOUND_ACTIVATED
    }
}

export const setFirewallActivated = ():IGameStateSettingsActions => {
    return {
        type: GameSettingsActions.SET_FIREWALL_ACTIVATED
    }
}