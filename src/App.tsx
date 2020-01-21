import React, { Component } from 'react';
import World from './components/world/World';
import Menu from './components/menu/Menu';
import { connect } from 'react-redux';
import './App.css';


const mapStateToProps = (state:any) => {
  return { gameIsStarted: state.gameIsStarted };
}

type myProps = ReturnType<typeof mapStateToProps>;

class App extends Component<myProps> {
  render() {
    return (
      <div className="App">
        <Menu/>
        {this.props.gameIsStarted && <World/>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
