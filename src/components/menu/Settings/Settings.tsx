import React, { Component } from "react";
import MenuBase from "../MenuBase";
import { RouteComponentProps, Link } from "react-router-dom";

class Settings extends Component<RouteComponentProps> {
  render() {
    const menu: JSX.Element = (
      <ul className="menuItems bangerFont">
        <li>
          <Link to={`${this.props.match.path}/controls`}>Controls</Link>
        </li>
        <li>Game Physics</li>
      </ul>
    );
    return <MenuBase renderElement={menu} currentUrl={this.props.match.url} />;
  }
}

export default Settings;
