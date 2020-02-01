import { PlayerDataActions } from "../actions/PlayerDataActionsEnum";
import {
  IPlayerControlAction,
  IPlayerColorAction
} from "../actions/IPlayerDataAction";
import { PlayersData } from "../../configuration/PlayerData";
import { IPlayerData } from "../../interfaces/IPlayerData";

type Action = IPlayerControlAction | IPlayerColorAction;

const playerDataReducer = (
  state = PlayersData,
  action: Action
) => {
  switch (action.type) {
    case PlayerDataActions.CHANGE_CONTROL:
      return changeControl(state, action as IPlayerControlAction);

    case PlayerDataActions.CHANGE_COLOR:
      return changeColor(state, action as IPlayerColorAction);

    default:
      return state;
  }
};

function changeControl(
  state: Array<IPlayerData>,
  action: IPlayerControlAction
) {
  let currentKey = state
    .find(p => p.name === action.payload.playerName)
    ?.controls.find(c => c.name === action.payload.control)?.key;
  if (currentKey) currentKey = action.payload.newKey;
  state = state.map(p => {
    if (p.name === action.payload.playerName) {
      p.controls = p.controls.map(c => {
        if (c.name === action.payload.control) c.key = action.payload.newKey;
        return c;
      });
    }
    return p;
  });

  return state;
}

function changeColor(
  state: Array<IPlayerData>,
  action: IPlayerColorAction
) {
  state = state.map((p:IPlayerData) => {
    if (p.name === action.payload.playerName && p.body.options.render?.fillStyle)
      p.body.options.render.fillStyle= action.payload.color;
    return p;
  })
  return state;
}

export default playerDataReducer;
