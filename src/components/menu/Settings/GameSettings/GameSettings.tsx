import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import MenuBase from "../../MenuBase";
import "./GameSettings.scss";
import { Slider, ThemeProvider, styled, Switch } from "@material-ui/core";
import darkTheme from "../../../../theme/MatUiTheme";
import { IState } from "../../../../state/IState";
import { IConnectedProps } from "../../../../interfaces/IConnectedProps";
import { connect } from "react-redux";
import {
  changeGameSpeed,
  setSoundActivated,
  setFirewallActivated
} from "../../../../state/actions/gameSettingsActions";

const marks = [
  {
    value: 0.8,
    label: "slow"
  },
  {
    value: 1,
    label: "normal"
  },
  {
    value: 1.2,
    label: "fast"
  }
];

const MySlider = styled(Slider)({
  width: 200,
  marginLeft: "auto"
});

const mapStateToProps = (state: IState) => {
  return { gameSetting: state.gameSettings };
};
type myProps = RouteComponentProps & IConnectedProps;

class GameSettings extends Component<myProps> {
  render() {
    const gameSettings: JSX.Element = (
      <div className="gameSettingsContainer">
        <ThemeProvider theme={darkTheme}>
          <div className="gameSettingName bangerFont">
            <div>Gamespeed</div>
            <div>Sound</div>
            <div>Color</div>
            <div>Firewall</div>
          </div>
          <div className="gameSettingName bangerFont">
            <MySlider
              className="bangerFont"
              defaultValue={1}
              onChange={(e, value) => {
                this.props.dispatch(changeGameSpeed(value as number));
              }}
              // valueLabelFormat={valueLabelFormat}
              // getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-restrict"
              step={0.1}
              valueLabelDisplay="auto"
              marks={marks}
              min={0.8}
              max={1.2}
            />
            <Switch
              defaultChecked
              value="checkedF"
              color="primary"
              onChange={e => this.props.dispatch(setSoundActivated())}
            />
            <div className="gameSetting">
              <div>Player 1</div>
              <div>Player2</div>
            </div>
            <Switch
              value="checkedF"
              color="primary"
              onChange={e => this.props.dispatch(setFirewallActivated())}
            />
          </div>
        </ThemeProvider>
      </div>
    );
    return (
      <MenuBase
        renderElement={gameSettings}
        currentUrl={this.props.match.url}
      />
    );
  }
}

export default connect(mapStateToProps)(GameSettings);
