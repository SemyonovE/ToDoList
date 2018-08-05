import React from "react";
import { connect } from "react-redux";
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
    cookies: instanceOf(Cookies).isRequired, // Cookies
    loginModalTitles: PropTypes.objectOf(PropTypes.string).isRequired // Dictionary
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
    const { loginModalTitles } = this.props;

    return (
      <div>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{loginModalTitles.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormGroup>
              <ControlLabel>{loginModalTitles.login}</ControlLabel>
              <FormControl
                type="email"
                value={this.state.login}
                placeholder={loginModalTitles.loginTitle}
                onChange={ev => this.handleChange(ev, "login")}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>{loginModalTitles.password}</ControlLabel>
              <FormControl
                type="password"
                value={this.state.password}
                placeholder={loginModalTitles.passwordTitle}
                onChange={ev => this.handleChange(ev, "password")}
              />
            </FormGroup>
            <Checkbox onChange={ev => this.handleRemember(ev)}>
              {loginModalTitles.remember}
            </Checkbox>{" "}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.hangleForgetPassword}>
              {loginModalTitles.forget}
            </Button>
            <Button
              bsStyle="primary"
              {...(this.state.disabledCome ? { disabled: true } : null)}
              onClick={this.handleCome}
            >
              {loginModalTitles.come}
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
    const email = prompt(this.props.loginModalTitles.forgetEmail, "");
    const password = prompt(this.props.loginModalTitles.forgetEmail, "");
    if (email && password) {
      alert(this.props.loginModalTitles.forgetMessage);
      loadFromServer({
        email: email,
        forget: password
      });
    }
  };
}

export default withCookies(
  connect(state => {
    return {
      loginModalTitles: state.language.loginModalTitles
    };
  })(LoginModal)
);
