import Matter from "matter-js";
import { ballBody } from "../../configuration/BallBody";

export class Ball {
  constructor(maxSpeed: number) {
    this._body = Matter.Bodies.circle(
      ballBody.x,
      ballBody.y,
      ballBody.diameter,
      ballBody.options
    );
    this._maxSpeed = maxSpeed;
    this._ballIsServed = false;
    this._leftPlayerServes = true;
    this.adaptBallSpeed = false;
    this.positionMarker = Matter.Bodies.circle(
      this._body.position.x,
      10,
      5,
      {
        isSensor: true,
        isStatic: true,
        render: {
          fillStyle: "transparent"
        }
      }
    );
  }
  private _body: Matter.Body;
  private _maxSpeed: number;
  private _ballIsServed: boolean;
  private _leftPlayerServes: boolean;
  public adaptBallSpeed: boolean;
  public positionMarker: Matter.Body;

  get ballIsServed() {
    return this._ballIsServed;
  }

  get body() {
    return this._body;
  }

  public setPositionMarker() {
    if (this._body.position.y < 0){
      Matter.Body.setPosition(this.positionMarker, {x: this._body.position.x, y: this.positionMarker.position.y})
      this.positionMarker.render.fillStyle = '#ffffff'
    }
    else {
      this.positionMarker.render.fillStyle = "transparent";
    }
  }

  public preventGoingTooFast() {
    if (this._body.speed > this._maxSpeed) {
      const factor = this._body.speed / this._maxSpeed;
      Matter.Body.setVelocity(this._body, {
        x: this._body.velocity.x / factor,
        y: this._body.velocity.y / factor
      });
    }
  }

  public adaptBallSpedToFactor(gameSpeed: number) {
    if (this.adaptBallSpeed) {
      let factor = gameSpeed;
      const adaptedSpeed = this._body.speed * factor;
      if (adaptedSpeed > this._maxSpeed) {
        factor = this._maxSpeed / this._body.speed;
      }
      Matter.Body.setVelocity(this._body, {
        x: this._body.velocity.x * factor,
        y: this._body.velocity.y * factor
      });
    }
  }

  public serveBall() {
    this._ballIsServed = true;
    Matter.Body.setStatic(this._body, false);
    Matter.Body.setMass(this._body, 0.5);
    this.adaptBallSpeed = false;
  }

  public resetBall(): Matter.Body {
    this._ballIsServed = false;
    this._leftPlayerServes = !this._leftPlayerServes;
    const x = this._leftPlayerServes ? ballBody.x : ballBody.x * 3;
    return (this._body = Matter.Bodies.circle(
      x,
      ballBody.y,
      ballBody.diameter,
      ballBody.options
    ));
  }
}
