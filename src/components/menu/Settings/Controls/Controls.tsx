import React, { Component } from "react";
import { connect } from "react-redux";
import MenuBase from "../../MenuBase";
import { RouteComponentProps } from "react-router-dom";
import { IConnectedProps } from "../../../../interfaces/IConnectedProps";
import { ControlsEnum } from "../../../../enums/Controls";
import { changeControl } from "../../../../state/actions/playerDataActions";
import {
  ArrowUpward,
  ArrowDownward,
  ArrowBack,
  ArrowForward
} from "@material-ui/icons";
import "./Controls.scss";
import { TextField, ThemeProvider, styled } from "@material-ui/core";
import { IState } from "../../../../state/IState";
import { IControl } from "../../../../interfaces/IControl";
import darkTheme from "../../../../theme/MatUiTheme";

const MyTextfield = styled(TextField)({
  width: 100
});

const mapStateToProps = (state: IState) => {
  return { controls: state.controls };
};
type myProps = RouteComponentProps & IConnectedProps;

class Controls extends Component<myProps> {
  constructor(props: myProps) {
    super(props);
    this.keyDownHandler = this.keyDownHandler.bind(this);
  }
  private keyDownHandler(playerName: string, control: string, key: string) {
    this.props.dispatch(changeControl(playerName, control, key));
  }

  private getTextField(control: IControl, name: string): JSX.Element {
    return (
      <MyTextfield
        id="input-with-icon-grid"
        label={control.name}
        variant="filled"
        value={control.key}
        onKeyDown={e => this.keyDownHandler(name, control.name, e.key)}
        inputProps={{
          maxLength: 1,
          autoComplete: "off"
        }}
      />
    );
  }
  private getControl(control: IControl, name: string): JSX.Element {
    const fontSize = "large";
    const textField: JSX.Element = this.getTextField(control, name);
    switch (control.name) {
      case ControlsEnum.up:
        return (
          <>
            <ArrowUpward fontSize={fontSize} />
            {textField}
          </>
        );
      case ControlsEnum.down:
        return (
          <>
            <ArrowDownward fontSize={fontSize} />
            {textField}
          </>
        );
      case ControlsEnum.left:
        return (
          <>
            <ArrowBack fontSize={fontSize} />
            {textField}
          </>
        );
      default:
        return (
          <>
            <ArrowForward fontSize={fontSize} />
            {textField}
          </>
        );
    }
  }
  render() {
    const Players = this.props.controls.map((p, i) => {
      const player: JSX.Element = (
        <div className="playerContainer" key={i}>
          <h3>{p.name}</h3>
          {p.controls.map((control, i) => {
            return (
              <div className="control" key={i}>
                {this.getControl(control, p.name)}
              </div>
            );
          })}
        </div>
      );
      return player;
    });
    const Controls: JSX.Element = (
      <div className="menuItems bangerFont">
        <ThemeProvider theme={darkTheme}>
          <div className="controlsContainer">{Players}</div>
        </ThemeProvider>
      </div>
    );
    return (
      <MenuBase renderElement={Controls} currentUrl={this.props.match.url} />
    );
  }
}

export default connect(mapStateToProps)(Controls);
