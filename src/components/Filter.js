import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Panel, Row, Grid, Col } from "react-bootstrap";

import FilterSelect from "./SelectForm";
import tabDecorator from "../decorators/tabDecorator";

Filter.propTypes = {
  filterKey: PropTypes.number,
  displayMode: PropTypes.number,
  changeFilterParameter: PropTypes.func,
  importances: PropTypes.array,
  displayMods: PropTypes.array,
  filterTitles: PropTypes.array
};

function Filter(props) {
  const { importances, displayMods, filterTitles } = props;

  return (
    <Panel bsStyle="info">
      <Panel.Heading className="panel-header" />
      <Panel.Body>
        <Grid>
          <Row>
            <Col xs={12} sm={6}>
              <FilterSelect
                title={filterTitles[0]}
                field="filterKey"
                changeFunction={props.changeFilterParameter}
                currentValue={props.filterKey}
                options={[
                  { value: -1, title: importances[0] },
                  { value: 0, title: importances[1] },
                  { value: 1, title: importances[2] },
                  { value: 3, title: importances[3] }
                ]}
              />
            </Col>
            <Col xs={12} sm={6}>
              <FilterSelect
                title={filterTitles[1]}
                field="displayMode"
                changeFunction={props.changeFilterParameter}
                currentValue={props.showFinished}
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
  );
}

export default tabDecorator(
  connect(state => {
    return {
      importances: state.language.importances,
      displayMods: state.language.displayMods,
      filterTitles: state.language.filterTitles
    };
  })(Filter)
);
