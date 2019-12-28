import React, { Component } from "react";
import Matter from "matter-js";
import controls from "./gameControls";

const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Events = Matter.Events,
  Body = Matter.Body;

class WorldClass extends Component {
  constructor(props) {
    super(props);
    this.setupWorld = this.setupWorld.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.worldWidth = 1000;
    this.worldHeight = 600;
    this.groundHeight = 30;
    this.criclesDiameter = 40;
    this.player1 = Bodies.circle(
      this.worldWidth / 4,
      this.worldHeight - this.groundHeight - this.criclesDiameter,
      this.criclesDiameter,
      { friction: 0 }
    );
    // this.boxA = Bodies.rectangle(
    //   this.worldWidth / 4,
    //   this.worldHeight - this.groundHeight - this.criclesDiameter,
    //   20,
    //   20,
    //   {friction:0}
    // );
    this.boxB = Bodies.circle(
      (this.worldWidth / 4) * 3,
      this.worldHeight - this.groundHeight - this.criclesDiameter,
      this.criclesDiameter
    );
    this.net = Bodies.rectangle(
      this.worldWidth / 2,
      (this.worldHeight / 4) * 3 - this.groundHeight,
      10,
      this.worldHeight / 2,
      { isStatic: true }
    );
    this.currentlyPressedKeys = [];
  }

  componentDidMount() {
    this.setupWorld();
  }

  keyUpHandler(e) {
    console.log("KEY UP");
    if (e.key === "a" && this.player1.velocity.x < 0) {
      Body.setVelocity(this.player1, { x: 0, y: this.player1.velocity.y });
    }
    if (e.key === "d" && this.player1.velocity.x > 0) {
      Body.setVelocity(this.player1, { x: 0, y: this.player1.velocity.y });
    }
    this.currentlyPressedKeys = this.currentlyPressedKeys.filter(
      k => k !== e.key
    );
  }

  keyDownHandler(e) {
    this.currentlyPressedKeys.push(e.key);
    switch (e.key) {
      case controls.player1.left:
        Body.setVelocity(this.player1, { x: -7, y: this.player1.velocity.y });
        break;

      case controls.player1.right:
        if (this.player1.position.x < this.net.position.x - 50) {
          console.log("Moving right");
          Body.setVelocity(this.player1, { x: 7, y: this.player1.velocity.y });
          break;
        } else {
          console.log("STOP");
          Body.setVelocity(this.player1, { x: 0, y: this.player1.velocity.y });
          break;
        }

      case controls.player1.up:
        Body.setVelocity(this.player1, { x: this.player1.velocity.x, y: -26 });
        break;

      case "ArrowLeft":
        break;
      default:
        console.log("no valid key was pressed");
    }
  }

  movePlayer(box, x) {
    Body.setVelocity(box, { x: x, y: 20 });
  }

  setupWorld() {
    // create an engine
    const engine = Engine.create();

    // create a renderer
    const render = Render.create({
      element: this.refs.World,
      engine: engine,
      options: {
        width: this.worldWidth,
        height: this.worldHeight,
        showAngleIndicator: false
      }
    });

    const engineWorld = engine.world;

    // create two boxes and a ground
    //this.boxA = Bodies.circle(this.worldWidth/4, this.worldHeight-this.groundHeight-this.criclesDiameter, this.criclesDiameter);

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
      this.worldHeight,
      { isStatic: true }
    );

    const rightWall = Bodies.rectangle(
      this.worldWidth - this.groundHeight / 2,
      this.worldHeight / 2,
      this.groundHeight,
      this.worldHeight,
      { isStatic: true }
    );

    // add all of the bodies to the world

    World.add(engineWorld, [
      this.player1,
      this.boxB,
      ground,
      leftWall,
      rightWall,
      this.net
    ]);

    engineWorld.gravity.y = 3;

    Events.on(engine, 'beforeUpdate', (event) => {
      if (this.player1.position.x >= this.net.position.x-50 && this.player1.velocity.x >0){
        Body.setVelocity(this.player1, { x: 0, y: this.player1.velocity.y });
      }
    })


    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
  }

  render() {
    return (
      <div
        className="World"
        tabIndex="0"
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
