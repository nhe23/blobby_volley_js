import React, { Component } from "react";
import "./World.scss";
import { Link } from "react-router-dom";
import { IState } from "../../state/IState";
import { connect } from "react-redux";
import { endGame } from "../../state/actions/gameStateActions";
import { IConnectedProps } from "../../interfaces/IConnectedProps";

const mapStateToProps = (state: IState) => {
    return { gameState: state.gameState };
  };
  

class GameOver extends Component <IConnectedProps>{
  render() {
    return (
      <div className="World">
        <div className="gameOverContainer">
    <div className="gameOverElement">{this.props.gameState.data} has won! Loser is propably Devid</div>
          <Link to="/" onClick={e => this.props.dispatch(endGame())}>Back to menu</Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GameOver);
