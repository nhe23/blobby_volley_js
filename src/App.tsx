import React, { Component } from "react";
import World from "./components/world/World";
import GameOver from "./components/world/GameOver";
import Menu from "./components/menu/Menu";
import Settings from "./components/menu/Settings/Settings";
import Controls from "./components/menu/Settings/Controls/Controls";
import GameSettings from "./components/menu/Settings/GameSettings/GameSettings";
import { connect } from "react-redux";
import "./App.scss";
import { IState } from "./state/IState";
import { GameStatus } from "./state/reducers/GameStateEnum";
import { Route, BrowserRouter as Router } from "react-router-dom";

const mapStateToProps = (state: IState) => {
  return { gameState: state.gameState };
};

type myProps = ReturnType<typeof mapStateToProps>;

class App extends Component<myProps> {
  render() {
    console.log(this.props.gameState);
    const world =this.props.gameState.status === GameStatus.GAME_IS_OVER? GameOver: World;
    return (
      <Router>
        <div className="App">
          <h1 className="title">Blobbey Volley. js</h1>
          <Route exact path="/" component={Menu}/>
          <Route path ="/play" component={world}/>
          <Route exact path="/settings" component={Settings}></Route>
          <Route path="/settings/controls" component={Controls}></Route>
          <Route path="/settings/gamesettings" component={GameSettings}></Route>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
