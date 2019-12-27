import React, { Component } from "react";
import Matter from "matter-js";

import "./App.css";

const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

class WorldClass extends Component {
  constructor(props) {
    super(props);
    this.setupWorld = this.setupWorld.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.move = this.move.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.worldWidth = 1000;
    this.worldHeight = 600;
    this.groundHeight = 30;
    this.criclesDiameter = 40;
    this.boxA = Bodies.circle(
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
    this.currentlyPressedKeys = [];
  }

  componentDidMount() {
    this.setupWorld();
  }

  keyUpHandler(e) {
    console.log("KEY UP");
    if (e.key === "a") {
      Body.setVelocity(this.boxA, { x: 0, y: 0 });
    }
    if (e.key === "d") {
      Body.setVelocity(this.boxA, { x: 0, y: 0 });
    }
    this.currentlyPressedKeys = this.currentlyPressedKeys.filter(
      k => k !== e.key
    );
  }

  keyDownHandler(e) {
    this.currentlyPressedKeys.push(e.key);
    switch (e.key) {
      case "a":
        Body.setVelocity(this.boxA, { x: -10, y: this.boxA.velocity.y });
        this.move(e.key, this.boxA, -1);
        break;

      case "d":
        Body.setVelocity(this.boxA, { x: 10, y: this.boxA.velocity.y });
        this.move(e.key, this.boxA, -1);
        break;

      case "w":
        Body.setVelocity(this.boxA, { x: 0, y: -16 });
        this.move(e.key, this.boxA, -1);
        break;

      case "ArrowLeft":
        this.move(e.key, this.boxB, -1);
        break;
      default:
        console.log("no valid key was pressed");
    }
  }

  move(key, box, x) {
    return;
    while (this.currentlyPressedKeys.some(k => k === key)) {
      this.movePlayer(box, x);
      console.log("moved");
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

    const net = Bodies.rectangle(
      this.worldWidth / 2,
      (this.worldHeight / 4) * 3 - this.groundHeight,
      10,
      this.worldHeight / 2,
      { isStatic: true }
    );
    // add all of the bodies to the world
    World.add(engine.world, [
      this.boxA,
      this.boxB,
      ground,
      leftWall,
      rightWall,
      net
    ]);

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
