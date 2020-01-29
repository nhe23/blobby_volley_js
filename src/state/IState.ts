import { IPlayerControl } from "../interfaces/IPlayerData";

export interface IState {
  gameState: {
    status: string;
    data: string;
  };
  controls: Array<IPlayerControl>;
  gameSettings: {
    gameSpeed: number;
    soundIsActivated: boolean;
    firewallIsActivated: boolean;
  };
}
