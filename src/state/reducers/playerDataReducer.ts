import { PlayerDataActions } from "../actions/PlayerDataActionsEnum";
import { IPlayerControlAction } from "../actions/IPlayerDataAction";
import { PlayersData } from "../../configuration/PlayerData";

const controlsReducer = (
  state = PlayersData.map(p => {
    return { name: p.name, controls: p.controls };
  }),
  action: IPlayerControlAction
) => {
  switch (action.type) {
    case PlayerDataActions.CHANGE_CONTROL: {
      let currentKey = state
        .find(p => p.name === action.payload.playerName)
        ?.controls.find(c => c.name === action.payload.control)?.key;
      if (currentKey) currentKey = action.payload.newKey;
      state = state.map(p => {
        if (p.name === action.payload.playerName) {
          p.controls = p.controls.map(c => {
            if (c.name === action.payload.control)
              c.key = action.payload.newKey;
            return c;
          });
        }
        return p;
      });

      return state;
    }

    default:
      return state;
  }
};

export default controlsReducer;
