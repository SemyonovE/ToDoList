import React from "react";
import { string, func } from "prop-types";
import { connect } from "react-redux";
import { changeDefineHeader } from "../actionCreator";
import { Jumbotron, Grid, Row, Col } from "react-bootstrap";

import TasksList from "./TaskList";
import LoginModal from "./LoginModal";

import ControlButtons from "./ControlButtons";
import { Consumer } from "../context";
import NavigationTab from "./NavigationTab";

class App extends React.Component {
  state = {
    loginStatus: false
  };

  render = ({ defineHeader } = this.props, { toggleLogin } = this) => (
    // Creating storage with define of the header, on the first start
    <Jumbotron className="without-margins all-screen">
      <Consumer>
        {({ LANG: { appHeader, defaultDefine, propmptText } }) =>
          this.state.loginStatus ? (
            <div>
              <ControlButtons {...{ toggleLogin }} />
              <Grid>
                <Row>
                  <Col xs={12}>
                    {/* Header with author's name or 'mine' and application name */}
                    <h1>
                      <span
                        className="select-when-hover"
                        onClick={() =>
                          this.props.changeDefineHeader(
                            prompt(propmptText + "?", defineHeader) || ""
                          )
                        }
                      >
                        {defineHeader !== "" ? defineHeader : defaultDefine}
                      </span>
                      {" " + appHeader + ":"}
                    </h1>
                    <NavigationTab />
                  </Col>
                  {/* Displaying everything tasks with its properties */}
                  <TasksList />
                </Row>
              </Grid>
            </div>
          ) : (
            <LoginModal {...{ toggleLogin }} />
          )
        }
      </Consumer>
    </Jumbotron>
  );

  toggleLogin = () => {
    this.setState(pS => ({
      loginStatus: !pS.loginStatus
    }));
  };
}

App.propTypes = {
  defineHeader: string.isRequired, // The definition of the author in the header
  changeDefineHeader: func.isRequired // Function for change the definition of header
};

export default connect(
  ({ setting: { defineHeader } }) => ({ defineHeader }),
  {
    changeDefineHeader
  }
)(App);
