import React from "react";
import { number, func } from "prop-types";
import { connect } from "react-redux";
import { changeDisplayMode, changeFilter } from "../actionCreator";

import { Panel, Row, Grid, Col } from "react-bootstrap";

import { SelectForm, ButtonWithTrigger } from "./";
import tabDecorator from "../decorators/tabDecorator";
import { Consumer } from "../context";
import styled from "styled-components";

import { settingDefault } from "../helpers/initialParameters";
import { SpanRight, ClearStyle } from "../styles";

const ClearBoth = styled(Panel.Heading)`
  ${ClearStyle};
`;

const Filter = ({
  changeFilter,
  filterKey,
  displayMode,
  changeDisplayMode
}) => (
  <Consumer>
    {({
      LANG: { importances, displayMods, filterTitles, clearFilterTooltip }
    }) => (
      <Panel bsStyle="info">
        <ClearBoth>
          <SpanRight>
            <ButtonWithTrigger
              iconType="repeat"
              tooltipText={clearFilterTooltip}
              activateFunction={() => {
                changeFilter(settingDefault.filterKey);
                changeDisplayMode(settingDefault.displayMode);
              }}
            />
          </SpanRight>
        </ClearBoth>
        <Panel.Body>
          <Grid>
            <Row>
              <Col xs={12} sm={6}>
                <SelectForm
                  title={filterTitles[0]}
                  changeFunction={changeFilter}
                  currentValue={filterKey}
                  options={[
                    { value: -1, title: importances[0] },
                    { value: 0, title: importances[1] },
                    { value: 1, title: importances[2] },
                    { value: 3, title: importances[3] }
                  ]}
                />
              </Col>
              <Col xs={12} sm={6}>
                <SelectForm
                  title={filterTitles[1]}
                  changeFunction={changeDisplayMode}
                  currentValue={displayMode}
                  options={[
                    { value: -1, title: displayMods[0] },
                    { value: 0, title: displayMods[1] },
                    { value: 1, title: displayMods[2] }
                  ]}
                />
              </Col>
            </Row>
          </Grid>
        </Panel.Body>
      </Panel>
    )}
  </Consumer>
);

Filter.propTypes = {
  filterKey: number.isRequired, // Number for filtering by importance
  displayMode: number.isRequired, // Number for filtering by complete
  changeFilter: func.isRequired, // Function for change one of the parameter of the filter
  changeDisplayMode: func.isRequired // Function for change one of the parameter of the filter
};

const WithTab = tabDecorator(
  connect(
    ({ setting: { filterKey, displayMode } }) => ({ filterKey, displayMode }),
    { changeFilter, changeDisplayMode }
  )(Filter)
);

export { WithTab as Filter };
