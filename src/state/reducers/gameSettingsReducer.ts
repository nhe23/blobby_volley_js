import { GameSettingsActions } from "../actions/GameSettingsActionsEnum";
import { IGameStateSettingsActions } from "../actions/IGameStateSettingActions";

export const gameSettingsReducer = (
  state = { gameSpeed: 1, soundIsActivated: false, firewallIsActivated: false },
  action: IGameStateSettingsActions
) => {
  switch (action.type) {
    case GameSettingsActions.CHANGE_GAME_SPEED: {
      if (action.payload) state.gameSpeed = action.payload.gameSpeedFactor;
      return state;
    }
    case GameSettingsActions.SET_SOUND_ACTIVATED: {
      state.soundIsActivated = !state.soundIsActivated;
      return state;
    }
    case GameSettingsActions.SET_FIREWALL_ACTIVATED: {
      state.firewallIsActivated = !state.firewallIsActivated;
      return state;
    }

    default:
      return state;
  }
};
