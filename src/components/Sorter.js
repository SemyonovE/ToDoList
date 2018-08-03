import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Panel, Row, Grid, Col } from "react-bootstrap";

import SelectForm from "./SelectForm";
import ButtonWithTrigger from "./ButtonWithTrigger";
import tabDecorator from "../decorators/tabDecorator";

import noSetFunction from "../helpers/notSetFunction";

Sorter.propTypes = {
  sorterMode: PropTypes.number.isRequired, // Number for mode of sorting
  changeSorterParameter: PropTypes.func.isRequired, // Function for change the parameter of the sort
  sorters: PropTypes.array.isRequired, // Array of the options of select for sort
  sorterTitle: PropTypes.string, // The title of select of the sorter
  clearSorterTooltip: PropTypes.string.isRequired, // Text for Tooltip
  clearSorter: PropTypes.func // Function for cleaning parameters of the sorter
};

Sorter.defaultProps = {
  sorterTitle: "Title",
  clearSorter: noSetFunction
};

function Sorter(props) {
  const { sorters } = props;

  return (
    <Panel bsStyle="info">
      <Panel.Heading className="clear">
        <span className="right">
          <ButtonWithTrigger
            id=""
            iconType="repeat"
            tooltipText={props.clearSorterTooltip}
            activateFunction={props.clearSorter}
            buttonStyle="primary"
          />
        </span>
      </Panel.Heading>
      <Panel.Body>
        <Grid>
          <Row>
            <Col xs={12}>
              <SelectForm
                title={props.sorterTitle}
                field="sorterMode"
                changeFunction={props.changeSorterParameter}
                currentValue={props.sorterMode}
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
  );
}

export default tabDecorator(
  // Decorator for make this form for tab
  connect(state => {
    return {
      sorters: state.language.sorters,
      sorterTitle: state.language.sorterTitle,
      clearSorterTooltip: state.language.clearFilterTooltip
    };
  })(Sorter)
);
