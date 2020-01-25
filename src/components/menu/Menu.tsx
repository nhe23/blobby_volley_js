import React, { Component } from "react";
import {
  Link,
  RouteComponentProps
} from "react-router-dom";
import MenuBase from "./MenuBase";

class Menu extends Component<RouteComponentProps> {
  render() {
    const items: JSX.Element = (
      <div>
        <li><Link to="/play">Start Game</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </div>
    );

    return <MenuBase list={items}></MenuBase>;
  }
}

export default Menu;
