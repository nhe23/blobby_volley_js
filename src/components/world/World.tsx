import React, { Component } from "react";
import Matter from "matter-js";
import { connect } from "react-redux";
import { PlayersData } from "../../configuration/PlayerData";
import { Player } from "./Player";
import { IWorldState } from "./IWorldState";
import { worldDimensions } from "../../configuration/WorldDimensions";
import { Ball } from "./Ball";
import { staticBodies } from "../../configuration/StaticBodies";
import { IState } from "../../state/IState";
import { IConnectedProps } from "../../interfaces/IConnectedProps";
import { completeGame } from "../../state/actions/gameStateActions";
import "./World.scss";
import { Link } from "react-router-dom";
import { IControl } from "../../interfaces/IControl";

const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World;

const mapStateToProps = (state: IState) => {
  return {
    gameState: state.gameState,
    controls: state.controls,
    gameSettings: state.gameSettings
  };
};

class WorldClass extends Component<IConnectedProps, IWorldState> {
  constructor(props: any) {
    super(props);
    this.worldRef = React.createRef();
    this.state = { player1Points: 0, player2Points: 0 };
    this.setupWorld = this.setupWorld.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);

    // create an engine
    this.engine = Engine.create();
    this.engineWorld = this.engine.world;

    this.players = [];
    PlayersData.forEach(playerData => {
      const controls: Array<IControl> | undefined = this.props.controls.find(
        p => p.name === playerData.name
      )?.controls;
      if (!controls) {
        throw new Error(`No controls defined for player ${playerData.name}`);
      }
      const player = new Player(
        playerData.body,
        controls,
        playerData.isLeftPlayer,
        this.props.gameSettings.gameSpeed
      );
      this.players.push(player);
    });
    this.net = staticBodies.net;

    this.ball = new Ball(20);
  }

  private net: Matter.Body;
  private worldRef: any;
  private ball: Ball;
  private players: Array<Player>;
  private engine: Matter.Engine;
  private engineWorld: Matter.World;
  private audioPlayer: any;

  componentDidMount() {
    this.audioPlayer.src =
      "http://soundbible.com/mp3/Mario_Jumping-Mike_Koenig-989896458.mp3";
    this.audioPlayer.preLoad = "auto";
    this.setupWorld();
    this.worldRef.current.focus();
  }

  componentDidUpdate() {
    this.worldRef.current.focus();
  }

  private keyUpHandler(e: any) {
    this.players.find(p => p.keyIsPlayerControl(e.key))?.stopMove(e.key);
  }

  private keyDownHandler(e: any) {
    this.players.find(p => p.keyIsPlayerControl(e.key))?.move(e.key);
  }

  private playSound() {
    this.audioPlayer.pause();
    this.audioPlayer.currentTime = 0;
    this.audioPlayer.play();
  }

  private setupWorld() {
    const render = Render.create({
      element: this.worldRef.current,
      engine: this.engine,
      options: {
        width: worldDimensions.width,
        height: worldDimensions.height,
        wireframes: false
      }
    });
    this.engine.timing.timeScale = 1.2;
    const playerBodies = this.players.map(p => p.body);

    World.add(this.engineWorld, [
      ...playerBodies,
      staticBodies.ground,
      staticBodies.leftWall,
      staticBodies.rightWall,
      this.net,
      this.ball.body,
      this.ball.positionMarker
    ]);

    this.engineWorld.gravity.y = 1;
    // run the engine
    Engine.run(this.engine);

    // run the renderer
    Render.run(render);

    Matter.Events.on(this.engine, "beforeUpdate", event => {
      this.ball.preventGoingTooFast();
      this.ball.setPositionMarker();
      this.players.forEach(player => {
        player.watchJump(worldDimensions.height / 4);
        player.preventGoingOverNet(this.net);
        // player.preventGoingOutOfBounds();
      });
    });
    Matter.Events.on(this.engine, "collisionEnd", event => {
      this.ball.adaptBallSpedToFactor(this.props.gameSettings.gameSpeed);
    });

    Matter.Events.on(this.engine, "collisionStart", event => {
      this.handleBodiesCollision(event.pairs);
      const winner = this.players.find(
        p => p.points > (this.props.gameSettings.firewallIsActivated ? 149 : 14)
      );
      if (winner) {
        this.props.dispatch(
          completeGame(winner.isLeftPlayer ? "Left player" : "Right player")
        );
      }
    });
  }

  private handleBodiesCollision(collisionPair:Matter.IPair[]){
    collisionPair.forEach(pair => {
      const pairBodies = [pair.bodyA, pair.bodyB];
      // Collision between player and ball
      if (
        pairBodies.some(b => b === this.ball.body) &&
        this.players.some(p => pairBodies.some(b => b === p.body))
      ) {
        if (this.props.gameSettings.soundIsActivated) this.playSound();
        if (!this.ball.ballIsServed) this.ball.serveBall();
        else if (!this.ball.adaptBallSpeed) this.ball.adaptBallSpeed = true;

        const collisionPlayer = this.players.find(p =>
          pairBodies.some(b => b === p.body)
        );
        const scoringPlayer = this.players.find(p => p !== collisionPlayer);
        if (collisionPlayer && scoringPlayer) {
          collisionPlayer.consecutiveBallTouches += 1;
          scoringPlayer.consecutiveBallTouches = 0;
          if (collisionPlayer.consecutiveBallTouches > 3) {
            this.setScore(
              scoringPlayer,
              collisionPlayer,
              this.props.gameSettings.firewallIsActivated ? 10 : 1
            );
          }
        }
        return;
      }

      //Collision between ball and ground
      if (
        pairBodies.some(b => b === this.ball.body) &&
        pairBodies.some(b => b === staticBodies.ground)
      ) {
        if (!this.ball.adaptBallSpeed) this.ball.adaptBallSpeed = true;
        const scoringPlayer =
          this.ball.body.position.x < worldDimensions.width / 2
            ? this.players.find(p => !p.isLeftPlayer)
            : this.players.find(p => p.isLeftPlayer);
        if (!scoringPlayer)
          throw new Error(
            "At lest one player has to be defined as left player"
          );
        const otherPlayer = this.players.find(
          p => p.isLeftPlayer !== scoringPlayer.isLeftPlayer
        );
        if (!otherPlayer)
          throw new Error(
            "At lest one player has to be defined as left player"
          );

        this.setScore(
          scoringPlayer,
          otherPlayer,
          this.props.gameSettings.firewallIsActivated ? 10 : 1
        );
      }

      // Collision between ball and walls
      if (
        this.props.gameSettings.firewallIsActivated &&
        pairBodies.some(b => b === this.ball.body) &&
        pairBodies.some(
          b => b === staticBodies.leftWall || b === staticBodies.rightWall
        )
      ) {
        const leftPlayer = this.players.find(p => p.isLeftPlayer);
        const rightPlayer = this.players.find(p => !p.isLeftPlayer);
        if (!leftPlayer || !rightPlayer)
          throw new Error("Invalid player configuration.");
        if (pairBodies.some(b => b === staticBodies.leftWall))
          return this.setScore(rightPlayer, leftPlayer, 1, true);
        this.setScore(leftPlayer, rightPlayer, 1, true);
      }
    });
  }

  private resetBall() {
    World.remove(this.engineWorld, this.ball.body);
    const newBall = this.ball.resetBall();
    World.add(this.engineWorld, newBall);
  }

  private setScore(
    scoringPlayer: Player,
    otherPlayer: Player,
    points: number,
    wallpoint = false
  ) {
    scoringPlayer.points += points;
    const newState: IWorldState = scoringPlayer.isLeftPlayer
      ? {
          player1Points: scoringPlayer.points,
          player2Points: otherPlayer.points
        }
      : {
          player1Points: otherPlayer.points,
          player2Points: scoringPlayer.points
        };
    this.setState(newState);
    if (!wallpoint) {
      this.players.forEach(p => {
        p.consecutiveBallTouches = 0;
        Matter.Body.setPosition(p.body, p.initialPosition);
      });
      this.resetBall();
    }
  }

  render() {
    return (
      <div
        className="World"
        tabIndex={-1}
        onKeyDown={this.keyDownHandler}
        onKeyUp={this.keyUpHandler}
        id="World"
        ref={this.worldRef}
      >
        <audio ref={ref => (this.audioPlayer = ref)} />
        <div className="gameScore">
          <div className="score">{this.state.player1Points}</div>
          <div className="score">
            <Link to="/">Menu</Link>
          </div>
          <div className="score">{this.state.player2Points}</div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(WorldClass);
