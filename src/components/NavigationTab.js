import React from "react";
import { number, func } from "prop-types";
import { connect } from "react-redux";
import { changeTabIndexDefault } from "../actionCreator";
import styled from "styled-components";

import { Tabs, Glyphicon } from "react-bootstrap";

import { Filter, CreateTask, Sorter, EmptyTab } from "./";

const TabsStyled = styled(Tabs)`
  position: relative;
  > ul {
    position: absolute;
    top: 2px;
    left: 2px;
  }
`;

const NavigationTab = ({ tabIndexDefault, changeTabIndexDefault }) => (
  <TabsStyled
    defaultActiveKey={tabIndexDefault}
    animation={false}
    onSelect={i => changeTabIndexDefault(i)}
    id="main-tabs"
  >
    <EmptyTab eventKey={0} title={<Glyphicon glyph="minus" />} />
    {/* Form for set main fields of the task and create new task */}
    <CreateTask eventKey={1} title={<Glyphicon glyph="plus" />} />
    {/* Future filter for display selected tasks */}
    <Filter eventKey={2} title={<Glyphicon glyph="filter" />} />
    <Sorter eventKey={3} title={<Glyphicon glyph="sort" />} />
  </TabsStyled>
);

NavigationTab.propTypes = {
  tabIndexDefault: number.isRequired, // The parameter of the value of opened tab
  changeTabIndexDefault: func.isRequired // Function for change the parameter of opened tab
};

const WithConnect = connect(
  ({ setting: { tabIndexDefault } }) => ({
    tabIndexDefault
  }),
  { changeTabIndexDefault }
)(NavigationTab);

export { WithConnect as NavigationTab };
