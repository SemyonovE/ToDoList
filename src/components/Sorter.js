import React from "react";
import { number, func } from "prop-types";
import { connect } from "react-redux";
import { changeSorter } from "../actionCreator";

import { Panel, Row, Grid, Col } from "react-bootstrap";

import { SelectForm, ButtonWithTrigger } from "./";
import tabDecorator from "../decorators/tabDecorator";

import { Consumer } from "../context";
import { settingDefault } from "../helpers/initialParameters";
import { SpanRight, ClearStyle } from "../styles";
import styled from "styled-components";

const ClearBoth = styled(Panel.Heading)`
  ${ClearStyle};
`;

const Sorter = ({ changeSorter, sorterMode }) => (
  <Consumer>
    {({ LANG: { clearSorterTooltip, sorterTitle, sorters } }) => (
      <Panel bsStyle="info">
        <ClearBoth>
          <SpanRight>
            <ButtonWithTrigger
              iconType="repeat"
              tooltipText={clearSorterTooltip}
              activateFunction={() => changeSorter(settingDefault.sorterMode)}
            />
          </SpanRight>
        </ClearBoth>
        <Panel.Body>
          <Grid>
            <Row>
              <Col xs={12}>
                <SelectForm
                  title={sorterTitle}
                  changeFunction={changeSorter}
                  currentValue={sorterMode}
                  options={[
                    { value: -1, title: sorters[0] },
                    { value: 1, title: sorters[1] },
                    { value: 2, title: sorters[2] },
                    { value: 3, title: sorters[3] },
                    { value: 4, title: sorters[4] }
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

Sorter.propTypes = {
  sorterMode: number.isRequired, // Number for mode of sorting
  changeSorter: func.isRequired // Function for change the parameter of the sort
};

const WithTab = tabDecorator(
  connect(
    ({ setting: { sorterMode } }) => ({ sorterMode }),
    { changeSorter }
  )(Sorter)
);

export { WithTab as Sorter };
