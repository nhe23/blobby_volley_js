import React, { Component } from "react";
import Matter from "matter-js";
import { PlayersData } from "./configuration/PlayerData";
import { Player } from "./Player";
import { IPlayerData } from "../interfaces/IPlayerData";
import { worldDimensions } from "./configuration/WorldDimensions";
import { Ball } from "./Ball";
import { staticBodies } from "./configuration/StaticBodies";

const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World;

class WorldClass extends Component {
  constructor(props: any) {
    super(props);
    this.setupWorld = this.setupWorld.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);

    // create an engine
    this.engine = Engine.create();

    // create a renderer

    this.engineWorld = this.engine.world;

    const player1Data: IPlayerData = PlayersData.find(
      p => p.name === "player1"
    ) as IPlayerData;
    this.player1 = new Player(player1Data, true);

    const player2Data: IPlayerData = PlayersData.find(
      p => p.name === "player2"
    ) as IPlayerData;
    this.player2 = new Player(player2Data, false);

    this.players = [this.player1, this.player2];
    this.net = staticBodies.net;

    this.ball = new Ball(20);
  }

  private net: Matter.Body;
  private player1: Player;
  private player2: Player;
  private ball: Ball;
  private players: Array<Player>;
  private engine: Matter.Engine;
  private engineWorld: Matter.World;

  componentDidMount() {
    this.setupWorld();
  }

  private keyUpHandler(e: any) {
    this.players.find(p => p.keyIsPlayerControl(e.key))?.stopMove(e.key);
  }

  private keyDownHandler(e: any) {
    this.players.find(p => p.keyIsPlayerControl(e.key))?.move(e.key);
  }

  private setupWorld() {
    const render = Render.create({
      element: this.refs.World as HTMLElement,
      engine: this.engine,
      options: {
        width: worldDimensions.width,
        height: worldDimensions.height,
        wireframes: false
      }
    });
    this.engine.timing.timeScale = 1.2;

    World.add(this.engineWorld, [
      this.player1.body,
      this.player2.body,
      staticBodies.ground,
      staticBodies.leftWall,
      staticBodies.rightWall,
      this.net,
      this.ball.body
    ]);

    this.engineWorld.gravity.y = 1;

    Matter.Events.on(this.engine, "beforeUpdate", event => {
      this.ball.preventGoingTooFast();

      this.players.forEach(player => {
        player.watchJump(worldDimensions.height / 4);
        player.preventGoingOverNet(this.net);
      });
    });

    Matter.Events.on(this.engine, "collisionStart", event => {
      const pairs = event.pairs;
      pairs.forEach(pair => {
        const pairBodies = [pair.bodyA, pair.bodyB];
        // Collision between player and ball
        if (
          pairBodies.some(b => b === this.ball.body) &&
          this.players.some(p => pairBodies.some(b => b === p.body))
        ) {
          if (!this.ball.ballIsServed) {
            this.ball.serveBall();
          }
          const collisionPlayer = this.players.find(p =>
            pairBodies.some(b => b === p.body)
          );
          const otherPlayer = this.players.find(p => p !== collisionPlayer);
          if (collisionPlayer && otherPlayer) {
            collisionPlayer.consecutiveBallTouches += 1;
            otherPlayer.consecutiveBallTouches = 0;
            if (collisionPlayer.consecutiveBallTouches > 3) {
              otherPlayer.points += 1;
              this.resetBall();
            }
          }
          return;
        }

        if (
          (pair.bodyA === this.ball.body || pair.bodyB === this.ball.body) &&
          (pair.bodyA === staticBodies.ground ||
            pair.bodyB === staticBodies.ground)
        ) {
          const scoringPlayer =
            this.ball.body.position.x < worldDimensions.width / 2
              ? this.players.find(p => !p.isLeftPlayer)
              : this.players.find(p => p.isLeftPlayer);
          if (!scoringPlayer)
            throw new Error(
              "At lest one player has to be defined as left player"
            );

          scoringPlayer.points += 1;
          this.resetBall();
        }
      });
      console.log(`Player 1 has ${this.player1.points} Player2 has ${this.player2.points}`);
    });

    // run the engine
    Engine.run(this.engine);

    // run the renderer
    Render.run(render);
  }

  private resetBall() {
    World.remove(this.engineWorld, this.ball.body);
    const newBall = this.ball.resetBall();
    World.add(this.engineWorld, newBall);
  }

  render() {
    return (
      <div
        className="World"
        tabIndex={0}
        onKeyDown={this.keyDownHandler}
        onKeyUp={this.keyUpHandler}
        id="World"
        ref="World"
      >
        <h1>Blobbey Volley </h1>
      </div>
    );
  }
}

export default WorldClass;
