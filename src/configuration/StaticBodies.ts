import { worldDimensions } from "./WorldDimensions";
import Matter from "matter-js";

const staticBodies = {
  leftWall: Matter.Bodies.rectangle(
    worldDimensions.groundHeight / 2,
    worldDimensions.height / 2,
    worldDimensions.groundHeight,
    worldDimensions.height * 10,
    { isStatic: true }
  ),
  rightWall: Matter.Bodies.rectangle(
    worldDimensions.width - worldDimensions.groundHeight / 2,
    worldDimensions.height / 2,
    worldDimensions.groundHeight,
    worldDimensions.height * 10,
    { isStatic: true }
  ),
  ground: Matter.Bodies.rectangle(
    worldDimensions.width / 2,
    worldDimensions.height - worldDimensions.groundHeight / 2,
    worldDimensions.width,
    worldDimensions.groundHeight,
    { isStatic: true }
  ),
  net: Matter.Bodies.rectangle(
    worldDimensions.width / 2 - 5,
    (worldDimensions.height / 4) * 3 - worldDimensions.groundHeight,
    30,
    worldDimensions.height / 2,
    { isStatic: true }
  )
};

export { staticBodies };
