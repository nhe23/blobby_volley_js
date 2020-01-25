import React, { Component } from "react";
import MenuBase from "../../MenuBase";
import { RouteComponentProps, Link } from "react-router-dom";

class Controls extends Component<RouteComponentProps> {
  render() {
    // const urlSplit = this.props.match.url.split("/");
    // urlSplit.pop();
    // const breadCrumbs = urlSplit.map((u, i) => (
    //   <Link
    //     to={`${urlSplit
    //       .slice(0, i + 1)
    //       .map(s => s + "/")
    //       .join("")}`}
    //   >{`${u === "" ? "menu" : u}/`}</Link>
    // ));
    const menu: JSX.Element = <div>CONTROLS</div>;
    return <MenuBase list={menu} currentUrl={this.props.match.url} />;
  }
}

export default Controls;
