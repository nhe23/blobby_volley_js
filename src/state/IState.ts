import { IPlayerData } from "../interfaces/IPlayerData";

export interface IState {
  gameState: {
    status: string;
    data: string;
  };
  playerData: Array<IPlayerData>;
  gameSettings: {
    gameSpeed: number;
    soundIsActivated: boolean;
    firewallIsActivated: boolean;
  };
}
