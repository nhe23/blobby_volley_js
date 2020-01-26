import React, { Component } from "react";
import {
  Link,
  RouteComponentProps
} from "react-router-dom";
import MenuBase from "./MenuBase";

class Menu extends Component<RouteComponentProps> {
  render() {
    const items: JSX.Element = (
      <ul className="menuItems bangerFont">
        <li><Link to="/play">Start Game</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    );

    return <MenuBase renderElement={items}></MenuBase>;
  }
}

export default Menu;
