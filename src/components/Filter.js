import React from "react";
import PropTypes from "prop-types";

import { Panel, Row, Grid, Col } from "react-bootstrap";

import FilterSelect from "./SelectForm";
import tabDecorator from "../decorators/tabDecorator";

Filter.propTypes = {
  filterKey: PropTypes.number,
  displayMode: PropTypes.number,
  changeFilterParameter: PropTypes.func
};

function Filter(props) {
  return (
    <Panel bsStyle="info">
      <Panel.Heading className="panel-header" />
      <Panel.Body>
        <Grid>
          <Row>
            <Col xs={12} sm={6}>
              <FilterSelect
                title="Filtering tasks by importance"
                field="filterKey"
                changeFunction={props.changeFilterParameter}
                currentValue={props.filterKey}
                options={[
                  { value: -1, title: "everything" },
                  { value: 0, title: "normal" },
                  { value: 1, title: "important" },
                  { value: 3, title: "very important" }
                ]}
              />
            </Col>
            <Col xs={12} sm={6}>
              <FilterSelect
                title="Filtering tasks by completeness"
                field="displayMode"
                changeFunction={props.changeFilterParameter}
                currentValue={props.showFinished}
                options={[
                  { value: -1, title: "everything" },
                  { value: 0, title: "currents" },
                  { value: 1, title: "completed" }
                ]}
              />
            </Col>
          </Row>
        </Grid>
      </Panel.Body>
    </Panel>
  );
}

export default tabDecorator(Filter);
