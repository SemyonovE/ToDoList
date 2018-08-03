import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Panel, Row, Grid, Col } from "react-bootstrap";

import SelectForm from "./SelectForm";
import ButtonWithTrigger from "./ButtonWithTrigger";
import tabDecorator from "../decorators/tabDecorator";

import noSetFunction from "../helpers/notSetFunction";

Filter.propTypes = {
  filterKey: PropTypes.number.isRequired, // Number for filtering by importance
  displayMode: PropTypes.number.isRequired, // Number for filtering by complete
  changeFilterParameter: PropTypes.func.isRequired, // Function for change one of the parameter of the filter
  importances: PropTypes.array.isRequired, // Array of the options of select of importance
  displayMods: PropTypes.array.isRequired, // Array of the options of select of complete
  filterTitles: PropTypes.array, // Array of the titles of selects of the filter
  clearFilterTooltip: PropTypes.string.isRequired, // Text for Tooltip
  clearFilters: PropTypes.func // Function for cleaning parameters of the filter
};

Filter.defaultProps = {
  filterTitles: "Title",
  clearFilters: noSetFunction
};

function Filter(props) {
  const { importances, displayMods, filterTitles } = props;

  return (
    <Panel bsStyle="info">
      <Panel.Heading className="clear">
        <span className="right">
          <ButtonWithTrigger
            id=""
            iconType="repeat"
            tooltipText={props.clearFilterTooltip}
            activateFunction={props.clearFilters}
            buttonStyle="primary"
          />
        </span>
      </Panel.Heading>
      <Panel.Body>
        <Grid>
          <Row>
            <Col xs={12} sm={6}>
              <SelectForm
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
              <SelectForm
                title={filterTitles[1]}
                field="displayMode"
                changeFunction={props.changeFilterParameter}
                currentValue={props.displayMode}
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
  // Decorator for make this form for tab
  connect(state => {
    return {
      importances: state.language.importances,
      displayMods: state.language.displayMods,
      filterTitles: state.language.filterTitles,
      clearFilterTooltip: state.language.clearFilterTooltip
    };
  })(Filter)
);
