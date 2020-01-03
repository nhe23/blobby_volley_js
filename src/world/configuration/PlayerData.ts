import { IPlayerData } from "../../interfaces/IPlayerData";
import { ControlsEnum } from "../../interfaces/ControlsEnum"

const PlayersData:Array<IPlayerData> = [
  {
    name: "player1",
    controls: [
      {name: ControlsEnum.up, key: "w"},
      {name: ControlsEnum.down, key: "s"},
      {name: ControlsEnum.left, key: "a"},
      {name: ControlsEnum.right, key: "d"}
    ]
  },
  {
    name: "player2",
    controls: [
      {name: ControlsEnum.up, key: "ArrowUp"},
      {name: ControlsEnum.down, key: "ArrowDown"},
      {name: ControlsEnum.left, key: "ArrowLeft"},
      {name: ControlsEnum.right, key: "ArrowRight"}
    ]
  }
];
export { PlayersData };
