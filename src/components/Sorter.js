import React from "react";
import { number, func } from "prop-types";
import { connect } from "react-redux";
import { changeSorter } from "../actionCreator";

import { Panel, Row, Grid, Col } from "react-bootstrap";

import SelectForm from "./SelectForm";
import ButtonWithTrigger from "./ButtonWithTrigger";
import tabDecorator from "../decorators/tabDecorator";

import { Consumer } from "../context";
import { settingDefault } from "../helpers/initialParameters";

const Sorter = ({ changeSorter, sorterMode }) => (
  <Consumer>
    {({ LANG: { clearSorterTooltip, sorterTitle, sorters } }) => (
      <Panel bsStyle="info">
        <Panel.Heading className="clear">
          <span className="right">
            <ButtonWithTrigger
              iconType="repeat"
              tooltipText={clearSorterTooltip}
              activateFunction={() => changeSorter(settingDefault.sorterMode)}
            />
          </span>
        </Panel.Heading>
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

export default tabDecorator(
  connect(
    ({ setting: { sorterMode } }) => ({ sorterMode }),
    { changeSorter }
  )(Sorter)
);
