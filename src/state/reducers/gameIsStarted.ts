
import {GameIsStartedActions} from '../../enums/GameIsStartedActions';
import {IGameStateAction} from '../actions/IGameStateAction';

const gameIsStarted = (state=false, action:IGameStateAction) => {
    switch (action.type){
        case GameIsStartedActions.START_GAME:
            return true;
        case GameIsStartedActions.END_GAME:
            return false;
        default:
            return state;
    }
}


export default gameIsStarted;