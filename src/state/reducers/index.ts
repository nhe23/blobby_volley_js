import gameStatusReducer from "./gameStateReducer";
import playerDataReducer from "./playerDataReducer";
import { gameSettingsReducer } from "./gameSettingsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  gameState: gameStatusReducer,
  playerData: playerDataReducer,
  gameSettings: gameSettingsReducer
});

export default rootReducer;
