import gameStatusReducer from "./gameStateReducer";
import controlsReducer from "./playerDataReducer";
import { gameSettingsReducer } from "./gameSettingsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  gameState: gameStatusReducer,
  controls: controlsReducer,
  gameSettings: gameSettingsReducer
});

export default rootReducer;
