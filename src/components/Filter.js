import React from "react";
import PropTypes from "prop-types";

import { Panel, Row, Grid } from "react-bootstrap";
import FilterSelect from "./FilterSelect";

class Filter extends React.Component {
  static propTypes = {
    filterKey: PropTypes.number,
    displayMode: PropTypes.number,
    changeFilter: PropTypes.func,
    changeDisplayMode: PropTypes.func
  };

  render() {
    return (
      <Panel>
        <Panel.Body>
          <Grid>
            <Row>
              <FilterSelect
                title="Filtering tasks by importance"
                changeFunction={this.props.changeFilter}
                currentValue={this.props.filterKey}
                options={[
                  { value: -1, title: "everything" },
                  { value: 0, title: "normal" },
                  { value: 1, title: "important" },
                  { value: 3, title: "very important" }
                ]}
              />
              <FilterSelect
                title="Filtering tasks by completeness"
                changeFunction={this.props.changeDisplayMode}
                currentValue={this.props.showFinished}
                options={[
                  { value: -1, title: "everything" },
                  { value: 0, title: "currents" },
                  { value: 1, title: "completed" }
                ]}
              />
            </Row>
          </Grid>
        </Panel.Body>
      </Panel>
    );
  }
}

export default Filter;
