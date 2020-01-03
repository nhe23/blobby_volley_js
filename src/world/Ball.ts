import Matter from "matter-js";
import { ballBody } from "./configuration/BallBody";

export class Ball {
  constructor(maxSpeed:number) {
    this._body = Matter.Bodies.circle(ballBody.x, ballBody.y, ballBody.diameter, ballBody.options);
    this._maxSpeed = maxSpeed
    this._ballIsServed = false;
  }
  private _body: Matter.Body;
  private _maxSpeed: number;
  private _ballIsServed: boolean;

  get ballIsServed(){
      return this._ballIsServed;
  }

  get body(){
      return this._body;
  }

  public preventGoingTooFast() {
    const maxBallSpeed = 20;
    if (this._body.speed >= maxBallSpeed) {
      const factor = this._body.speed / maxBallSpeed;
      Matter.Body.setVelocity(this._body, {
        x: this._body.velocity.x / factor,
        y: this._body.velocity.y / factor
      });
    }
  }

  public serveBall() {
    this._ballIsServed = true;
    Matter.Body.setStatic(this._body, false);
    Matter.Body.setMass(this._body, 0.5);
  }
  public resetBall(): Matter.Body{
      this._ballIsServed = false;
      return this._body = Matter.Bodies.circle(ballBody.x, ballBody.y, ballBody.diameter, ballBody.options);
  }
}
