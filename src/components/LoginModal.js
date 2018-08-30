import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import { loadingFromServer } from "../actionCreator";

import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  Checkbox,
  ControlLabel
} from "react-bootstrap";

import styled from "styled-components";
import { requestToServer } from "../helpers/workWithServer";
import { Consumer } from "../context";

const ErrorMessage = styled.span`
  color: red;
  font-weight: bold;
  float: left;
`;

class LoginModal extends React.Component {
  state = {
    login: "",
    password: "",
    remember: false
  };

  render = (
    { login, password } = this.state,
    { loading, error } = this.props
  ) => (
    <Consumer>
      {({ LANG: { loginModalTitles } }) => (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{loginModalTitles.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormGroup>
              <ControlLabel>{loginModalTitles.login}</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={login}
                placeholder={loginModalTitles.loginTitle}
                onChange={ev => this.setState({ login: ev.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>{loginModalTitles.password}</ControlLabel>
              <FormControl
                type="password"
                value={password}
                placeholder={loginModalTitles.passwordTitle}
                onChange={ev => this.setState({ password: ev.target.value })}
                onKeyDown={ev => ev.key === "Enter" && this.checkAndComing()}
              />
            </FormGroup>
            <Checkbox
              onChange={ev => this.setState({ remember: ev.target.checked })}
            >
              {loginModalTitles.remember}
            </Checkbox>
          </Modal.Body>

          <Modal.Footer>
            {error && (
              <ErrorMessage>
                {loginModalTitles.error}: {error}
              </ErrorMessage>
            )}
            <Button onClick={() => this.forgotPassword(loginModalTitles)}>
              {loginModalTitles.forgot}
            </Button>
            <Button
              bsStyle="primary"
              {...loading && { disabled: true }}
              onClick={() => this.checkAndComing()}
            >
              {loading ? loginModalTitles.loading : loginModalTitles.come}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      )}
    </Consumer>
  );

  checkAndComing = ({ login, password, remember } = this.state) => {
    if (!login || !password) return;

    const reg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
    if (!reg.test(login.toLowerCase())) {
      alert("Incorrect email!");
      return;
    }

    const data = {
      email: login,
      password: password
    };

    this.props.loadingFromServer(data, remember);
  };

  forgotPassword = loginModalTitles => {
    const email = prompt(loginModalTitles.forgotEmail, "");
    const password = prompt(loginModalTitles.forgotPassword, "");
    if (email && password) {
      alert(loginModalTitles.forgotMessage);
      requestToServer({
        email: email,
        forget: password
      });
    }
  };
}

LoginModal.propTypes = {
  loadingFromServer: func.isRequired // Function for loading of the tasks and the setting
};

const WithConnect = connect(
  ({ user: { loading, error } }) => ({ loading, error }),
  { loadingFromServer }
)(LoginModal);

export { WithConnect as LoginModal };
