import gameStatusReducer from './gameStateReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    gameState: gameStatusReducer
})

export default rootReducer;