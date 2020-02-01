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
import {changeColor} from "../../../../state/actions/playerDataActions";
import { GithubPicker, ColorResult } from "react-color";
import { IPlayerData } from "../../../../interfaces/IPlayerData";

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
  return { gameSettings: state.gameSettings, playerData: state.playerData };
};
type myProps = RouteComponentProps & IConnectedProps;
interface myState {
  soundSwitchChecked: boolean;
  firewallSwitchChecked: boolean;
  showPlayer1ColorPicker: boolean;
  showPlayer2ColorPicker: boolean;
}

class GameSettings extends Component<myProps, myState> {
  constructor(props: myProps) {
    super(props);
    this.state = {
      soundSwitchChecked: this.props.gameSettings.soundIsActivated,
      firewallSwitchChecked: this.props.gameSettings.firewallIsActivated,
      showPlayer1ColorPicker: false,
      showPlayer2ColorPicker: false
    };
    this.handlePlayerColorClick = this.handlePlayerColorClick.bind(this);
    this.handleClorPickerChange = this.handleClorPickerChange.bind(this);
  }

  private handlePlayerColorClick(isLeftPlayer: boolean) {
    const newState = isLeftPlayer
      ? {
          showPlayer1ColorPicker: !this.state.showPlayer1ColorPicker,
          showPlayer2ColorPicker: this.state.showPlayer2ColorPicker
        }
      : {
          showPlayer1ColorPicker: this.state.showPlayer1ColorPicker,
          showPlayer2ColorPicker: !this.state.showPlayer2ColorPicker
        };
    this.setState(newState);
  }

  private handleClorPickerChange(color:ColorResult, playerName: string){
    const hexColor = color.hex
    this.props.dispatch(changeColor(playerName, hexColor));
  }

  private getPlayersColorPicker() {
    return (
      <>
        {this.props.playerData.map((p: IPlayerData) => {
          const showColorPicker = p.isLeftPlayer
            ? this.state.showPlayer1ColorPicker
            : this.state.showPlayer2ColorPicker;
          const style =  {color:p.body.options.render?.fillStyle?p.body.options.render.fillStyle:"#ffffff"}
          return (
            <div
              className="playerColor"
              style={style}
              onClick={e => this.handlePlayerColorClick(p.isLeftPlayer)}
            >
              <span>{p.name}</span>
              {showColorPicker && <GithubPicker onChange={color => this.handleClorPickerChange(color, p.name)}width="100px" />}
            </div>
          );
        })}
      </>
    );
  }

  render() {
    const gameSettings: JSX.Element = (
      <div className="gameSettingsContainer">
        <ThemeProvider theme={darkTheme}>
          <div className="gameSetting bangerFont">
            <div>Gamespeed</div>
            <MySlider
              className="bangerFont"
              defaultValue={1}
              onChange={(e, value) => {
                this.props.dispatch(changeGameSpeed(value as number));
              }}
              aria-labelledby="discrete-slider-restrict"
              step={0.1}
              valueLabelDisplay="auto"
              marks={marks}
              min={0.8}
              max={1.2}
            />
          </div>
          <div className="gameSetting bangerFont">
            <div>Sound</div>
            <Switch
              checked={this.state.soundSwitchChecked}
              value="checkedA"
              color="primary"
              onChange={e => {
                this.props.dispatch(setSoundActivated());
                this.setState({
                  soundSwitchChecked: this.props.gameSettings.soundIsActivated
                });
              }}
            />
          </div>
          <div className="gameSetting bangerFont">
            <div>Color</div>
            <div className="gameSetting">{this.getPlayersColorPicker()}</div>
          </div>
          <div className="gameSetting bangerFont">
            <div>Firewall</div>

            <Switch
              checked={this.state.firewallSwitchChecked}
              color="primary"
              onChange={e => {
                this.props.dispatch(setFirewallActivated());
                this.setState({
                  firewallSwitchChecked: this.props.gameSettings
                    .firewallIsActivated
                });
              }}
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
