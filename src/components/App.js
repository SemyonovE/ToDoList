import React from "react";
import { string, func } from "prop-types";
import { connect } from "react-redux";
import { changeDefineHeader } from "../actionCreator";
import { Jumbotron, Grid, Row, Col } from "react-bootstrap";
import styled from "styled-components";

import { TasksList, NavigationTab } from "./";

import { Consumer } from "../context";
import colorIdentifier from "../helpers/colorIdentifier";

const SpanWithHover = styled.span`
  :hover {
    cursor: pointer;
    background-color: rgba(128, 128, 128, 0.05);
  }
`;

const AllScreen = styled(Jumbotron)`
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;

const App = ({ defineHeader, colorStyle } = this.props) => {
  const JumbotronColor = styled(AllScreen)`
    background-color: ${colorStyle};
  `;
  const Header = styled.h1`
    text-align: center;
    color: ${colorIdentifier(colorStyle) ? "#111" : "#eee"} !important;
  `;
  // Creating storage with define of the header, on the first start
  return (
    <JumbotronColor>
      <Consumer>
        {({ LANG: { appHeader, defaultDefine, propmptText } }) => (
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
        )}
      </Consumer>
    </JumbotronColor>
  );
};

App.propTypes = {
  defineHeader: string.isRequired, // The definition of the author in the header
  changeDefineHeader: func.isRequired, // Function for change the definition of header
  colorStyle: string.isRequired // Color for Background
};

const WithConnect = connect(
  ({ setting: { defineHeader, colorStyle } }) => ({
    defineHeader,
    colorStyle
  }),
  {
    changeDefineHeader
  }
)(App);
export { WithConnect as App };
