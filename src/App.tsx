import React, { Component } from 'react';
import World from './components/world/World';
import Menu from './components/menu/Menu';
import { connect } from 'react-redux';
import './App.css';
import { IState } from './state/IState';
import { GameStatus } from './state/reducers/GameStateEnum';


const mapStateToProps = (state:IState) => {
  return { gameState: state.gameState };
}

type myProps = ReturnType<typeof mapStateToProps>;

class App extends Component<myProps> {
  render() {
    console.log(this.props.gameState)
    return (
      <div className="App">
        {this.props.gameState.status === GameStatus.GAME_IS_NOT_STARTED && <Menu/>}
        {this.props.gameState.status === GameStatus.GAME_IS_RUNNING && <World/>}
        {this.props.gameState.status === GameStatus.GAME_IS_OVER && <div>The winner is {this.props.gameState.data}</div>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
