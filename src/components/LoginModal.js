import React from "react";
import PropTypes, { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  Checkbox,
  ControlLabel
} from "react-bootstrap";

import { loadFromServer } from "../helpers/workWithServer";

class LoginModal extends React.Component {
  static propTypes = {
    handleCome: PropTypes.func, // Function for initial state of the store by data from server
    cookies: instanceOf(Cookies).isRequired // Cookies
  };

  static defaultProps = {
    handleCome: () => {}
  };

  constructor(props) {
    super(props);

    const userdata = this.props.cookies.get("userdata");
    if (typeof userdata === "object") {
      this.setCookies(userdata);
      this.props.handleCome(userdata);
    }

    this.state = {
      login: "",
      password: "",
      remember: false,
      disabledCome: false
    };
  }

  render() {
    return (
      <div>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Login or register</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormGroup>
              <ControlLabel>Login</ControlLabel>
              <FormControl
                type="email"
                value={this.state.login}
                placeholder="Enter email"
                onChange={ev => this.handleChange(ev, "login")}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.password}
                placeholder="Enter password"
                onChange={ev => this.handleChange(ev, "password")}
              />
            </FormGroup>
            <Checkbox onChange={ev => this.handleRemember(ev)}>
              Remember me
            </Checkbox>{" "}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.hangleForgetPassword}>Forget password</Button>
            <Button
              bsStyle="primary"
              {...(this.state.disabledCome ? { disabled: true } : null)}
              onClick={this.handleCome}
            >
              Come in
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }

  handleRemember = ev => {
    this.setState({
      remember: ev.target.checked
    });
  };

  handleChange = (ev, field) => {
    this.setState({
      [field]: ev.target.value
    });
  };

  handleCome = () => {
    const data = {
      email: this.state.login,
      password: this.state.password
    };

    const reg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
    if (!reg.test(String(data.email).toLowerCase())) {
      alert("Incorrect email!");
      return;
    }

    this.setState({
      disabledCome: true
    });

    if (this.state.remember) {
      this.setCookies(data);
    }
    this.props.handleCome(data, () =>
      this.setState({
        disabledCome: false
      })
    );
  };

  setCookies = userdata => {
    const now = new Date();
    now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    this.props.cookies.set("userdata", JSON.stringify(userdata), {
      maxAge: now
    });
  };

  hangleForgetPassword = () => {
    const email = prompt("Set your email:", "");
    const password = prompt("Set new password", "");
    if (email && password) {
      loadFromServer({
        email: email,
        forget: password
      });
    }
  };
}

export default withCookies(LoginModal);
