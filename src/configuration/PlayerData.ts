import { IPlayerData } from "../interfaces/IPlayerData";
import { ControlsEnum } from "../enums/Controls"
import { worldDimensions } from "./WorldDimensions";

const playerOptions = { friction: 0, mass:80 };

const PlayersData:Array<IPlayerData> = [
  {
    name: "player1",
    isLeftPlayer: true,
    controls: [
      {name: ControlsEnum.up, key: "w"},
      {name: ControlsEnum.down, key: "s"},
      {name: ControlsEnum.left, key: "a"},
      {name: ControlsEnum.right, key: "d"}
    ],
    body: {
      x: worldDimensions.width / 4,
      y: worldDimensions.height - worldDimensions.groundHeight - worldDimensions.circlesDiameter,
      diameter: worldDimensions.circlesDiameter,
      options: {...playerOptions, render:{ fillStyle: "#4696ff"}}
    }
  },
  {
    name: "player2",
    isLeftPlayer: false,
    controls: [
      {name: ControlsEnum.up, key: "ArrowUp"},
      {name: ControlsEnum.down, key: "ArrowDown"},
      {name: ControlsEnum.left, key: "ArrowLeft"},
      {name: ControlsEnum.right, key: "ArrowRight"}
    ],
    body: {
      x: (worldDimensions.width / 4) * 3,
      y: worldDimensions.height - worldDimensions.groundHeight - worldDimensions.circlesDiameter,
      diameter: worldDimensions.circlesDiameter,
      options: {...playerOptions, render:{ fillStyle: "#d8115a"}}
    }
  }
];
export { PlayersData };
