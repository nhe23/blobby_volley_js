import Matter from "matter-js";
import { IControl } from "../../interfaces/IControl";
import { ControlsEnum } from "../../enums/Controls";
import { ICircleBody } from "../../interfaces/ICircleBody";

export class Player {
  private _body: Matter.Body;
  private _controls: Array<IControl>;
  private _isLeftPlayer: Boolean;
  private _gameSpeed: number;
  public consecutiveBallTouches: number;
  public points: number;
  constructor(playerBody: ICircleBody, controls:Array<IControl> ,playerIsLeftPlayer:Boolean, gameSpeed: number) {
    this._body = Matter.Bodies.circle(
      playerBody.x,
      playerBody.y,
      playerBody.diameter,
      playerBody.options
    );
    this._controls = controls;
    this._isLeftPlayer = playerIsLeftPlayer;
    this.consecutiveBallTouches = 0;
    this.points = 0;
    this._gameSpeed = gameSpeed;
  }

  get body (){
    return this._body;
  }

  get isLeftPlayer (){
    return this._isLeftPlayer;
  }

  public keyIsPlayerControl(key: string): boolean {
    return this._controls.some(c => c.key === key);
  }

  public move(key: string) {
    const direction = this._controls.find(c => c.key === key);
    switch (direction?.name) {
      case ControlsEnum.left:
        this.moveLeft();
        break;
      case ControlsEnum.right:
        this.moveRight();
        break;
      case ControlsEnum.up:
        this.jump();
        break;
    }
  }

  public stopMove(key: string) {
    const direction = this._controls.find(c => c.key === key);
    switch (direction?.name) {
      case ControlsEnum.left:
        if (this._body.velocity.x < 0)
          Matter.Body.setVelocity(this._body, { x: 0, y: this._body.velocity.y });
        break;
      case ControlsEnum.right:
        if (this._body.velocity.x > 0)
          Matter.Body.setVelocity(this._body, { x: 0, y: this._body.velocity.y });
        break;
    }
  }

  public preventGoingOverNet(net: Matter.Body) {
    if (
      (this._isLeftPlayer && this._body.velocity.x > 0 &&
        this._body.position.x >= net.position.x - 50) ||
      (!this._isLeftPlayer && this._body.velocity.x < 0 && this._body.position.x <= net.position.x + 50)
    ) {
      this.moveBody(0);
    }
  }

  public preventGoingOutOfBounds(){
    if (this.body.position.y > 531){
      Matter.Body.setPosition(this.body, {x: this.body.position.x, y: 530})
    }
  }

  public watchJump(maxHeight:number){
    if (this._body.velocity.y < -1 && this._body.position.y <= 150){
      this.moveBody(undefined, 10);
    }
  }

  public moveLeft() {
    this.moveBody(-10);
  }

  public moveRight() {
    this.moveBody(10);
  }

  public jump() {
    this.moveBody(undefined, -23);
  }

  private moveBody(xVector?: number, yVector?: number) {
    console.log(`Gamespeed ${this._gameSpeed}`);
    if (xVector !== undefined && yVector !== undefined)
      return Matter.Body.setVelocity(this._body, { x: xVector, y: yVector });

    if (xVector !== undefined)
      return Matter.Body.setVelocity(this._body, {
        x: xVector*this._gameSpeed,
        y: this._body.velocity.y
      });

    if (yVector !== undefined)
      return Matter.Body.setVelocity(this._body, {
        x: this._body.velocity.x,
        y: yVector*this._gameSpeed
      });
    console.error("At least one direction of the vector must be defined");
  }
}
