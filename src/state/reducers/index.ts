import gameStatusReducer from './gameStateReducer';
import controlsReducer from "./playerDataReducer";
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    gameState: gameStatusReducer,
    controls: controlsReducer
})

export default rootReducer;