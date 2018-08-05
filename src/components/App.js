import React from "react";
import PropTypes, { instanceOf } from "prop-types";
import { connect } from "react-redux";
import { loadTasklist } from "../actionCreator";
import { CookiesProvider, withCookies, Cookies } from "react-cookie";

import { Jumbotron, Grid, Row, Col, Tabs, Glyphicon } from "react-bootstrap";

import Filter from "./Filter";
import CreateTask from "./CreateTask";
import TasksList from "./TaskList";
import Language from "./Language";
import Sorter from "./Sorter";
import Login from "./Login";
import LoginModal from "./LoginModal";
import EmptyTab from "./EmptyTab";
import TaskListStyle from "./TaskListStyle";

import {
  loadFromLocalStorage,
  saveToLocalStorage
} from "../helpers/workWithStorage";
import { loadFromServer } from "../helpers/workWithServer";

const initialFilter = {
  filterKey: -1,
  displayMode: 0
};

const initialSorter = {
  sorterMode: -1
};

class App extends React.Component {
  static propTypes = {
    appHeader: PropTypes.string.isRequired, // Text of the header
    defaultDefine: PropTypes.string.isRequired, // 'My' to indicate of the define of the header
    propmptText: PropTypes.string.isRequired, // Text for prompt, when user will want to change its name
    cookies: instanceOf(Cookies).isRequired // Cookies
  };
  // Initialize filter parameters:
  //  filterKey for filtering by importance:
  //    -1 : everything
  //     0 : normal
  //     1 : importance
  //     2 : very importance
  //  displayMode for filterring by complete:
  //    -1 : enerything
  //     0 : currents
  //     1 : completed
  //  sorterMode for sorting tasks:
  //    -1 : default
  //     1 : title
  //     2 : date
  //     3 : first important
  //     4 : first unimportant
  state = {
    ...initialFilter,
    ...initialSorter,
    defineHeader: "",
    taskliststyle: loadFromLocalStorage(0, "taskliststyle"),
    loginStatus: false,
    userName: ""
  };

  render() {
    const {
      filterKey,
      displayMode,
      sorterMode,
      defineHeader,
      loginStatus,
      userName
    } = this.state;

    // Creating storage with define of the header, on the first start
    const tempDefine = defineHeader
      ? defineHeader
      : loadFromLocalStorage("", "defineList");

    const { taskliststyle } = this.state;

    return (
      <Jumbotron className="without-margins all-screen">
        {loginStatus ? (
          <div>
            <Language />
            <Login toggleLogin={this.toggleLogin} userName={userName} />
            <TaskListStyle
              taskliststyle={+taskliststyle}
              toggleStyleListStyle={this.toggleStyleListStyle}
            />
            <Grid>
              <Row>
                <Col xs={12}>
                  <h1>
                    {" "}
                    {/* Header with author's name or 'mine' and application name */}
                    <span
                      onClick={this.chandeDefineHeader}
                      className="select-when-hover"
                    >
                      {tempDefine && tempDefine !== ""
                        ? tempDefine
                        : this.props.defaultDefine}
                    </span>
                    {" " + this.props.appHeader + ":"}
                  </h1>
                  <Tabs
                    defaultActiveKey={loadFromLocalStorage(
                      1,
                      "tabIndexDefault"
                    )}
                    animation={false}
                    onSelect={this.handleSelectTab}
                    id="controlled-tab-example"
                  >
                    <EmptyTab
                      eventKey={0}
                      title={<Glyphicon glyph="minus" />}
                    />
                    {/* Form for set main fields of the task and create new task */}
                    <CreateTask
                      eventKey={1}
                      title={<Glyphicon glyph="plus" />}
                    />
                    {/* Future filter for display selected tasks */}
                    <Filter
                      eventKey={2}
                      title={<Glyphicon glyph="filter" />}
                      filterKey={filterKey}
                      displayMode={displayMode}
                      changeFilterParameter={this.changeParameter}
                      clearFilters={this.clearFilters}
                    />
                    <Sorter
                      eventKey={3}
                      title={<Glyphicon glyph="sort" />}
                      sorterMode={sorterMode}
                      changeSorterParameter={this.changeParameter}
                      clearSorter={this.clearSorter}
                    />
                  </Tabs>
                </Col>
                {/* Displaying everything tasks with its properties */}
                <TasksList
                  filterKey={filterKey}
                  displayMode={displayMode}
                  sorterMode={sorterMode}
                  userName={userName}
                  taskliststyle={+taskliststyle}
                />
              </Row>
            </Grid>
          </div>
        ) : (
          <CookiesProvider>
            <LoginModal handleCome={this.handleCome} />
          </CookiesProvider>
        )}
      </Jumbotron>
    );
  }

  toggleStyleListStyle = () => {
    const mode = loadFromLocalStorage(0, "taskliststyle") === 0 ? 1 : 0;
    saveToLocalStorage(mode, "taskliststyle");
    this.setState({
      taskliststyle: mode
    });
  };

  handleSelectTab = key => {
    saveToLocalStorage(+key, "tabIndexDefault");
  };

  toggleLogin = () => {
    if (this.state.loginStatus) {
      this.props.cookies.set("userdata", "false");
      this.clearFilters();
      this.clearSorter();
    }
    this.setState({
      loginStatus: !this.state.loginStatus
    });
  };

  clearFilters = () => {
    // Initial of the filter's parameters
    this.setState(initialFilter);
  };

  clearSorter = () => {
    // Initial of the filter's parameters
    this.setState(initialSorter);
  };

  setUserName = value => {
    this.setState({
      userName: value
    });
    saveToLocalStorage(value, "userName");
  };

  changeParameter = (ev, filter) => {
    // Change parameter that is needed
    this.setState({
      [filter]: +ev.target.value
    });
  };

  chandeDefineHeader = () => {
    // Attempt load of the define of the header
    let define = loadFromLocalStorage("", "defineList");

    // Receiving new define of the header from the user
    const answer = prompt(this.props.propmptText + "?", define);

    if (answer) {
      // Save the define of the header and updating of state
      saveToLocalStorage(answer, "defineList");

      this.setState({
        defineHeader: answer
      });
    } else if (answer === "") {
      saveToLocalStorage("", "defineList");

      this.setState({
        defineHeader: ""
      });
    }
  };

  handleCome = (data, func = () => {}) => {
    // Query on the server
    loadFromServer(
      data,

      // Function what to do when request is success
      answer => {
        func();
        if (answer) {
          // Set data to the store
          this.props.loadTasklist(JSON.parse(answer.tasks));

          // Set name of the user
          this.setUserName(data.email);

          // Toggle modal screen mode
          this.toggleLogin();
        }
      }
    );
  };
}

export default connect(
  state => {
    return {
      appHeader: state.language.appHeader,
      defaultDefine: state.language.defaultDefine,
      propmptText: state.language.propmptText
    };
  },
  { loadTasklist }
)(withCookies(App));
