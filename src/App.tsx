import React, { Component } from "react";
import World from "./components/world/World";
import Menu from "./components/menu/Menu";
import Settings from "./components/menu/Settings/Settings";
import Controls from "./components/menu/Settings/Controls/Controls";
import { connect } from "react-redux";
import "./App.scss";
import { IState } from "./state/IState";
import { GameStatus } from "./state/reducers/GameStateEnum";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const mapStateToProps = (state: IState) => {
  return { gameState: state.gameState };
};

type myProps = ReturnType<typeof mapStateToProps>;

class App extends Component<myProps> {
  render() {
    console.log(this.props.gameState);
    return (
      <Router>
        <div className="App">
          <h1 className="title">Blobbey Volley. js</h1>
          {/* {this.props.gameState.status === GameStatus.GAME_IS_NOT_STARTED && (
            <Menu />
          )}
          {this.props.gameState.status === GameStatus.GAME_IS_RUNNING && (
            <World />
          )}
          {this.props.gameState.status === GameStatus.GAME_IS_OVER && (
            <div>The winner is {this.props.gameState.data}</div>
          )} */}
          <Route exact path="/" component={Menu}/>
          <Route path ="/play" component={World}/>
          <Route exact path="/settings" component={Settings}></Route>
          <Route path="/settings/controls" component={Controls}></Route>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
