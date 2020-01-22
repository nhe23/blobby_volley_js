import { GameStateActions } from "../../enums/GameIsStartedActions";
import { IGameStateAction } from "../actions/IGameStateAction";
import { GameStatus } from "./GameStateEnum";

const gameStateReducer = (
  state = { status: GameStatus.GAME_IS_NOT_STARTED, data: "" },
  action: IGameStateAction
) => {
  switch (action.type) {
    case GameStateActions.START_GAME:
      return { status: GameStatus.GAME_IS_RUNNING, data: action.payload};
    case GameStateActions.COMPLETE_GAME:
      return { status: GameStatus.GAME_IS_OVER, data: action.payload };
    case GameStateActions.END_GAME:
      return { status: GameStatus.GAME_IS_NOT_STARTED, data: action.payload };
    default:
      return state;
  }
};

export default gameStateReducer;
