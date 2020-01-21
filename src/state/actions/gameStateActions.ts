import {GameIsStartedActions} from '../../enums/GameIsStartedActions';
import {IGameStateAction} from './IGameStateAction';

const setGameStarted = ():IGameStateAction => {
    return {
        type: GameIsStartedActions.START_GAME
    }
}

// const setSettings = (settings: any) => {
//     return {
//         type: "SET_SETTINGS",
//         payload: settings
//     }
// }

export default setGameStarted;