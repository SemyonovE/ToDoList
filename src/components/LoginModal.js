import React from "react";
import { func, instanceOf } from "prop-types";
import { connect } from "react-redux";
import { loadingFromServer } from "../actionCreator";
import { withCookies, Cookies } from "react-cookie";

import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  Checkbox,
  ControlLabel
} from "react-bootstrap";
import moment from "moment";

import { requestToServer } from "../helpers/workWithServer";
import { Consumer } from "../context";

class LoginModal extends React.Component {
  componentDidMount({ cookies } = this.props) {
    const userdata = cookies.get("userdata");
    if (typeof userdata === "object") {
      this.setCookies(userdata);
      this.props.loadingFromServer(userdata);
    }
  }

  state = {
    login: "",
    password: "",
    remember: false
  };

  render = ({ login, password } = this.state, { user } = this.props) => (
    <Consumer>
      {({ LANG: { loginModalTitles } }) => (
        <div>
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
              <Button onClick={() => this.forgotPassword(loginModalTitles)}>
                {loginModalTitles.forgot}
              </Button>
              {user && user.loading ? (
                <Button bsStyle="primary" {...{ disabled: true }}>
                  {loginModalTitles.loading}
                </Button>
              ) : (
                <Button bsStyle="primary" onClick={() => this.checkAndComing()}>
                  {loginModalTitles.come}
                </Button>
              )}
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </Consumer>
  );

  checkAndComing = ({ login, password, remember } = this.state) => {
    const reg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
    if (!reg.test(login.toLowerCase())) {
      alert("Incorrect email!");
      return;
    }

    const data = {
      email: login,
      password: password
    };

    remember && this.setCookies(data);

    this.props.loadingFromServer(data);
  };

  setCookies = (userdata, { cookies } = this.props) => {
    cookies.set("userdata", JSON.stringify(userdata), {
      expires: moment()
        .add(3, "month")
        .toDate()
    });
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
  loadingFromServer: func.isRequired, // Function for loading of the tasks and the setting
  cookies: instanceOf(Cookies).isRequired // Cookies
};

export default connect(
  ({ user }) => ({ user }),
  { loadingFromServer }
)(withCookies(LoginModal));
