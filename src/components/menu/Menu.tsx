import React, { Component } from "react";
import { startGame } from "../../state/actions/gameStateActions";
import { IState } from "../../state/IState";
import { IConnectedProps } from "../../interfaces/IConnectedProps";
import { connect } from "react-redux";
import "./Menu.css";

const mapStateToProps = (state: IState) => {
  return { gameState: state.gameState };
};

class Menu extends Component<IConnectedProps> {
  constructor(props: any) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  private startGame(e: any) {
    this.props.dispatch(startGame());
  }

  render() {
    console.log(this.props.gameState.status);
    return (
      <div className="menuContainer">
        <ul className="menuList">
          <li onClick={e => this.startGame(e)}> Start Game </li>
          <li>Settings</li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Menu);
