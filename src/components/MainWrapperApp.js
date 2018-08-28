import React from "react";
import App from "./App";
import { connect } from "react-redux";
import Login from "./Login";
import LoginModal from "./LoginModal";

const MainWrapperApp = ({ user }) =>
  user && user.login ? (
    <React.Fragment>
      <Login />
      <App />
    </React.Fragment>
  ) : (
    <LoginModal />
  );

export default connect(({ user }) => ({ user }))(MainWrapperApp);
