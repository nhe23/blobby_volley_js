import React, { Component } from "react";
import MenuBase from "../../MenuBase";
import { RouteComponentProps } from "react-router-dom";
import {ArrowUpward, ArrowDownward, ArrowBack, ArrowForward} from "@material-ui/icons";
import "./Controls.scss";
import {
  TextField,
  createMuiTheme,
  ThemeProvider,
  styled
} from "@material-ui/core";


const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#f65afa"
    },
    secondary: {
      main: "#4696ff"
    },
    type: "dark"
  }
});

const MyTextfield = styled(TextField)({
  width:80
});

class Controls extends Component<RouteComponentProps> {
  render() {
    const Controls: JSX.Element = (
      <div className="menuItems bangerFont">
        <div className="controlsContainer">
          <div className="playerContainer">
            <h3>Player1</h3>
            <div className="control">
              <ThemeProvider theme={darkTheme}>
                <ArrowUpward fontSize="large" />
                <MyTextfield
                  id="input-with-icon-grid"
                  label="UP"
                  variant="filled"
                  inputProps={{
                    maxLength: 1,
                    autoComplete: "off"
                  }}
                />
              </ThemeProvider>
            </div>
            <div className="control">
              <ThemeProvider theme={darkTheme}>
                <ArrowDownward fontSize="large" />
                <MyTextfield
                  id="input-with-icon-grid"
                  label="DOWN"
                  variant="filled"
                  inputProps={{
                    maxLength: 1
                  }}
                />
              </ThemeProvider>
            </div>
            <div className="control">
              <ThemeProvider theme={darkTheme}>
                <ArrowBack fontSize="large" />
                <MyTextfield
                  id="input-with-icon-grid"
                  label="LEFT"
                  variant="filled"
                  inputProps={{
                    maxLength: 1
                  }}
                />
              </ThemeProvider>
            </div>
            <div className="control">
              <ThemeProvider theme={darkTheme}>
                <ArrowForward fontSize="large" />
                <MyTextfield
                  id="input-with-icon-grid"
                  label="RIGHT"
                  variant="filled"
                  inputProps={{
                    maxLength: 1
                  }}
                />
              </ThemeProvider>
            </div>
          </div>
          
          <div className="playerContainer">
            <h3>Player2</h3>
          </div>
        </div>
      </div>
    );
    return (
      <MenuBase renderElement={Controls} currentUrl={this.props.match.url} />
    );
  }
}

export default Controls;
