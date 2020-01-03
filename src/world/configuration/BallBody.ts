import { ICircleBody } from "../../interfaces/ICircleBody";
import Beach_volleyball_ball from "./../../data/images/Beach_volleyball_ball.png"
import {worldDimensions} from "./WorldDimensions";

const ballBody: ICircleBody = {
    x: worldDimensions.width / 4,
    y: worldDimensions.height / 2,
    diameter: worldDimensions.circlesDiameter,
    options: {
        isStatic: true,
        frictionAir: 0,
        restitution: 1,
        render: {
          sprite: {
            xScale: 0.15,
            yScale: 0.15,
            texture: Beach_volleyball_ball
          }
        }
      }
};



export { ballBody };

