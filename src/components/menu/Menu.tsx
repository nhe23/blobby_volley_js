import React, { Component } from "react";
import setGameStarted from '../../state/actions/gameStateActions';
import { IState } from '../../state/IState'
import {IConnectedProps} from '../../interfaces/IConnectedProps';
import { connect } from 'react-redux';
import "./Menu.css";

const mapStateToProps = (state:IState) => {
    return { gameIsStarted: state.gameIsStarted };
}

class Menu extends Component <IConnectedProps>{
  
  constructor(props: any) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  private startGame(e: any) {
    this.props.dispatch(setGameStarted())
  }

  render() {
      console.log(this.props.gameIsStarted);
    return (
      <div>
        <ul className="menuList">
          <li onClick={e => this.startGame(e)}> Start Game {this.props.gameIsStarted}</li>
          <li>Settings</li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Menu);
