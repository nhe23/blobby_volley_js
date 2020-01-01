import React, { Component } from "react";
import Matter from "matter-js";
import { PlayersData } from "./PlayerData";
import { Player } from "./Player";
import { IPlayerData } from "../interfaces/IPlayerData";
import Beach_volleyball_ball from "./../data/Beach_volleyball_ball.png"

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
    this.worldWidth = 1000;
    this.worldHeight = 600;
    this.groundHeight = 30;
    this.criclesDiameter = 40;
    this.ballIsServed = false;
    const player1Data: IPlayerData = PlayersData.find(
      p => p.name === "player1"
    ) as IPlayerData;
    this.player1 = new Player(
      Bodies.circle(
        this.worldWidth / 4,
        this.worldHeight - this.groundHeight - this.criclesDiameter,
        this.criclesDiameter,
        { friction: 0 }
      ),
      player1Data,
      true
    );

    const player2Data: IPlayerData = PlayersData.find(
      p => p.name === "player2"
    ) as IPlayerData;
    this.player2 = new Player(
      Bodies.circle(
        (this.worldWidth / 4) * 3,
        this.worldHeight - this.groundHeight - this.criclesDiameter,
        this.criclesDiameter,
        { friction: 0 }
      ),
      player2Data,
      false
    );

    this.players = [this.player1, this.player2];
    this.net = Bodies.rectangle(
      this.worldWidth / 2 - 5,
      (this.worldHeight / 4) * 3 - this.groundHeight,
      30,
      this.worldHeight / 2,
      { isStatic: true }
    );

    this.initialBallData = {
      x: this.worldWidth / 4,
      y: this.worldHeight / 2,
      diameter: this.criclesDiameter,
      options: {
        isStatic: true,
        frictionAir: 0,
        restitution: 0.4,
        render: {
          sprite: {
            xScale: 0.15,
            yScale: 0.15,
            texture: Beach_volleyball_ball
          }
        }
      }
    };

    this.ball = Bodies.circle(
      this.worldWidth / 4,
      this.worldHeight / 2,
      this.criclesDiameter,
      this.initialBallData.options
    )
  }

  private worldWidth: number;
  private worldHeight: number;
  private groundHeight: number;
  private criclesDiameter: number;
  private net: Matter.Body;
  private player1: Player;
  private player2: Player;
  private players: Array<Player>;
  private ball: Matter.Body;
  private ballIsServed: Boolean;
  private initialBallData: any;

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
        width: this.worldWidth,
        height: this.worldHeight,
        wireframes: false
      }
    });

    const engineWorld = engine.world;
    engine.timing.timeScale = 1.2;

    const ground = Bodies.rectangle(
      this.worldWidth / 2,
      this.worldHeight - this.groundHeight / 2,
      this.worldWidth,
      this.groundHeight,
      { isStatic: true }
    );

    const leftWall = Bodies.rectangle(
      this.groundHeight / 2,
      this.worldHeight / 2,
      this.groundHeight,
      this.worldHeight * 10,
      { isStatic: true }
    );

    const rightWall = Bodies.rectangle(
      this.worldWidth - this.groundHeight / 2,
      this.worldHeight / 2,
      this.groundHeight,
      this.worldHeight * 10,
      { isStatic: true }
    );

    World.add(engineWorld, [
      this.player1.body,
      this.player2.body,
      ground,
      leftWall,
      rightWall,
      this.net,
      this.ball
    ]);

    engineWorld.gravity.y = 1;

    Matter.Events.on(engine, "beforeUpdate", event => {
      this.players.forEach(player => {
        player.watchJump(this.worldHeight / 4);
        player.preventGoingOverNet(this.net);
      });
    });

    Matter.Events.on(engine, "collisionStart", event => {
      const pairs = event.pairs;
      pairs.forEach(pair => {
        if (
          !this.ballIsServed &&
          (pair.bodyA === this.ball || pair.bodyB === this.ball)
        ) {
          this.ballIsServed = true;
          Matter.Body.setStatic(this.ball, false);
          Matter.Body.setMass(this.ball, 2);
          return;
        }

        if (
          (pair.bodyA === this.ball || pair.bodyB === this.ball) &&
          (pair.bodyA === ground || pair.bodyB === ground)
        ) {
          World.remove(engineWorld, this.ball);
          this.ball = Bodies.circle(
            this.initialBallData.x,
            this.initialBallData.y,
            this.initialBallData.diameter,
            this.initialBallData.options
          );
          World.add(engineWorld, this.ball);
          this.ballIsServed = false;
        }
      });

      // for (var i = 0, j = pairs.length; i != j; ++i) {
      //   var pair = pairs[i];

      //   if (pair.bodyA === collider) {
      //     pair.bodyB.render.strokeStyle = redColor;
      //   } else if (pair.bodyB === collider) {
      //     pair.bodyA.render.strokeStyle = redColor;
      //   }
      // }
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
