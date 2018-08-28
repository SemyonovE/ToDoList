import React from "react";
import { string, func } from "prop-types";
import { connect } from "react-redux";
import { changeDefineHeader } from "../actionCreator";
import { Jumbotron, Grid, Row, Col } from "react-bootstrap";
import styled from "styled-components";

import TasksList from "./TaskList";
import LoginModal from "./LoginModal";

import ControlButtons from "./ControlButtons";
import { Consumer } from "../context";
import NavigationTab from "./NavigationTab";

const SpanWithHover = styled.span`
  :hover {
    cursor: pointer;
    background-color: rgba(128, 128, 128, 0.05);
  }
`;

const Header = styled.h1`
  text-align: center;
`;

const AllScreen = styled(Jumbotron)`
  min-height: 100vh;
  margin: 0;
`;

const App = ({ defineHeader, colorStyle, user: loginStatus } = this.props) => {
  const JumbotronColor = styled(AllScreen)`
    background-color: ${colorStyle};
  `;
  // Creating storage with define of the header, on the first start
  return (
    <JumbotronColor>
      <Consumer>
        {({ LANG: { appHeader, defaultDefine, propmptText } }) =>
          loginStatus ? (
            <div>
              <ControlButtons />
              <Grid>
                <Row>
                  <Col xs={12}>
                    {/* Header with author's name or 'mine' and application name */}
                    <Header>
                      <SpanWithHover
                        onClick={() =>
                          this.props.changeDefineHeader(
                            prompt(propmptText + "?", defineHeader) || ""
                          )
                        }
                      >
                        {defineHeader !== "" ? defineHeader : defaultDefine}
                      </SpanWithHover>
                      {" " + appHeader + ":"}
                    </Header>
                    <NavigationTab />
                  </Col>
                  {/* Displaying everything tasks with its properties */}
                  <TasksList />
                </Row>
              </Grid>
            </div>
          ) : (
            <LoginModal />
          )
        }
      </Consumer>
    </JumbotronColor>
  );
};

App.propTypes = {
  defineHeader: string.isRequired, // The definition of the author in the header
  changeDefineHeader: func.isRequired // Function for change the definition of header
};

export default connect(
  ({ setting: { defineHeader, colorStyle }, user }) => ({
    defineHeader,
    colorStyle,
    user
  }),
  {
    changeDefineHeader
  }
)(App);
