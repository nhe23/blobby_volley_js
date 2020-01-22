import {GameStateActions} from '../../enums/GameIsStartedActions';
import {IGameStateAction} from './IGameStateAction';

export const startGame = ():IGameStateAction => {
    return {
        type: GameStateActions.START_GAME,
        payload: ''
    }
}

export const completeGame = (winner: string):IGameStateAction => {
    return {
        type: GameStateActions.COMPLETE_GAME,
        payload: winner
    }
}

export const endGame = ():IGameStateAction => {
    return {
        type: GameStateActions.END_GAME,
        payload: ''
    }
}

// const setSettings = (settings: any) => {
//     return {
//         type: "SET_SETTINGS",
//         payload: settings
//     }
// }

