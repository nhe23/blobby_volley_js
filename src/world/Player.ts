import Matter from "matter-js";
import { IPlayerData } from "../interfaces/IPlayerData";
import { IControl } from "../interfaces/IControl";
import { ControlsEnum } from "../interfaces/ControlsEnum";
// import { controls } from "./gameControls";

export class Player {
  public body: Matter.Body;
  private playerData: IPlayerData;
  private controls: Array<IControl>;
  private playerIsLeftPlayer: Boolean;
  constructor(body: Matter.Body, playerData: IPlayerData, playerIsLeftPlayer:Boolean) {
    this.body = body;
    this.playerData = playerData;
    this.controls = playerData.controls;
    this.playerIsLeftPlayer = playerIsLeftPlayer;
  }

  public keyIsPlayerControl(key: string): boolean {
    return this.controls.some(c => c.key === key);
  }

  public move(key: string) {
    const direction = this.controls.find(c => c.key === key);
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
    const direction = this.controls.find(c => c.key === key);
    switch (direction?.name) {
      case ControlsEnum.left:
        if (this.body.velocity.x < 0)
          Matter.Body.setVelocity(this.body, { x: 0, y: this.body.velocity.y });
        break;
      case ControlsEnum.right:
        if (this.body.velocity.x > 0)
          Matter.Body.setVelocity(this.body, { x: 0, y: this.body.velocity.y });
        break;
    }
  }

  public preventGoingOverNet(net: Matter.Body) {
    if (
      (this.playerIsLeftPlayer && this.body.velocity.x > 0 &&
        this.body.position.x >= net.position.x - 50) ||
      (!this.playerIsLeftPlayer && this.body.velocity.x < 0 && this.body.position.x <= net.position.x + 50)
    ) {
      this.moveBody(0);
    }
  }

  public moveLeft() {
    this.moveBody(-10);
  }

  public moveRight() {
    this.moveBody(10);
  }

  public jump() {
    this.moveBody(undefined, -26);
  }

  private moveBody(xVector?: number, yVector?: number) {
    if (xVector !== undefined && yVector !== undefined)
      return Matter.Body.setVelocity(this.body, { x: xVector, y: yVector });

    if (xVector !== undefined)
      return Matter.Body.setVelocity(this.body, {
        x: xVector,
        y: this.body.velocity.y
      });

    if (yVector !== undefined)
      return Matter.Body.setVelocity(this.body, {
        x: this.body.velocity.x,
        y: yVector
      });
    console.error("At least one direction of the vector must be defined");
  }
}
