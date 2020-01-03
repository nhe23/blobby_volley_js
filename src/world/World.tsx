import React, { Component } from "react";
import Matter from "matter-js";
import { PlayersData } from "./configuration/PlayerData";
import { Player } from "./Player";
import { IPlayerData } from "../interfaces/IPlayerData";
import {worldDimensions} from "./configuration/WorldDimensions";
import { Ball } from "./Ball";

const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

class WorldClass extends Component {
  constructor(props: any) {
    super(props);
    this.setupWorld = this.setupWorld.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    const player1Data: IPlayerData = PlayersData.find(
      p => p.name === "player1"
    ) as IPlayerData;
    this.player1 = new Player(
      Bodies.circle(
        worldDimensions.width / 4,
        worldDimensions.height - worldDimensions.groundHeight - worldDimensions.circlesDiameter,
        worldDimensions.circlesDiameter,
        { friction: 0, mass:80 }
      ),
      player1Data,
      true
    );

    const player2Data: IPlayerData = PlayersData.find(
      p => p.name === "player2"
    ) as IPlayerData;
    this.player2 = new Player(
      Bodies.circle(
        (worldDimensions.width / 4) * 3,
        worldDimensions.height - worldDimensions.groundHeight - worldDimensions.circlesDiameter,
        worldDimensions.circlesDiameter,
        { friction: 0, mass:80 }
      ),
      player2Data,
      false
    );

    this.players = [this.player1, this.player2];
    this.net = Bodies.rectangle(
      worldDimensions.width / 2 - 5,
      (worldDimensions.height / 4) * 3 - worldDimensions.groundHeight,
      30,
      worldDimensions.height / 2,
      { isStatic: true }
    );

    this.ball = new Ball(20);

  }

  private net: Matter.Body;
  private player1: Player;
  private player2: Player;
  private ball: Ball;
  private players: Array<Player>;
  
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
    // create an engine
    const engine = Engine.create();

    // create a renderer
    const render = Render.create({
      element: this.refs.World as HTMLElement,
      engine: engine,
      options: {
        width: worldDimensions.width,
        height: worldDimensions.height,
        wireframes: false
      }
    });

    const engineWorld = engine.world;
    engine.timing.timeScale = 1.2;

    const ground = Bodies.rectangle(
      worldDimensions.width / 2,
      worldDimensions.height - worldDimensions.groundHeight / 2,
      worldDimensions.width,
      worldDimensions.groundHeight,
      { isStatic: true }
    );

    const leftWall = Bodies.rectangle(
      worldDimensions.groundHeight / 2,
      worldDimensions.height / 2,
      worldDimensions.groundHeight,
      worldDimensions.height * 10,
      { isStatic: true }
    );

    const rightWall = Bodies.rectangle(
      worldDimensions.width - worldDimensions.groundHeight / 2,
      worldDimensions.height / 2,
      worldDimensions.groundHeight,
      worldDimensions.height * 10,
      { isStatic: true }
    );

    World.add(engineWorld, [
      this.player1.body,
      this.player2.body,
      ground,
      leftWall,
      rightWall,
      this.net,
      this.ball.body
    ]);

    engineWorld.gravity.y = 1;

    Matter.Events.on(engine, "beforeUpdate", event => {
      this.ball.preventGoingTooFast();
        
      this.players.forEach(player => {
        player.watchJump(worldDimensions.height / 4);
        player.preventGoingOverNet(this.net);
      });
    });

    Matter.Events.on(engine, "collisionStart", event => {
      const pairs = event.pairs;
      pairs.forEach(pair => {
        if (
          !this.ball.ballIsServed &&
          (pair.bodyA === this.ball.body || pair.bodyB === this.ball.body)
        ) {
          this.ball.serveBall();
          return;
        }

        if (
          (pair.bodyA === this.ball.body || pair.bodyB === this.ball.body) &&
          (pair.bodyA === ground || pair.bodyB === ground)
        ) {
          World.remove(engineWorld, this.ball.body);
          const newBall = this.ball.resetBall();
          World.add(engineWorld, newBall); 
        }
      });
    });

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
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
