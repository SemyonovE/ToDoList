import React from "react";
import { func, instanceOf } from "prop-types";
import { connect } from "react-redux";
import { loadTasklist, loadSetting } from "../actionCreator";
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
import { saveToLocalStorage } from "../helpers/workWithStorage";
import { settingDefault } from "../helpers/initialParameters";
import { Consumer } from "../context";

class LoginModal extends React.Component {
  componentDidMount() {
    const userdata = this.props.cookies.get("userdata");
    if (typeof userdata === "object") {
      this.setCookies(userdata);
      this.handleCome(userdata);
    }
  }

  state = {
    login: "",
    password: "",
    remember: false,
    enabledCome: true
  };

  render = ({ login, password } = this.state) => (
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
              <Button
                bsStyle="primary"
                {...!this.state.enabledCome && { disabled: true }}
                onClick={() => this.checkAndComing()}
              >
                {loginModalTitles.come}
              </Button>
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

    this.setState({
      enabledCome: false
    });

    remember && this.setCookies(data);

    this.handleCome(data, () =>
      this.setState({
        enabledCome: true
      })
    );
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

  handleCome = (data, func) => {
    // Query on the server
    requestToServer(data, res => {
      // Function what to do when request is success
      func && func();
      if (res) {
        // Set data to the store
        this.props.loadTasklist(JSON.parse(res.tasks));
        if (res.setting) {
          this.props.loadSetting(JSON.parse(res.setting));
        } else {
          this.props.loadSetting(settingDefault);
        }

        // Set name of the user
        saveToLocalStorage(data.email, "userName");

        // Toggle modal screen mode
        this.props.toggleLogin();
      }
    });
  };
}

LoginModal.propTypes = {
  toggleLogin: func.isRequired, // Function for loging
  loadTasklist: func.isRequired, // Function for loading of the tasks
  loadSetting: func.isRequired, // Function for loading of the setting
  cookies: instanceOf(Cookies).isRequired // Cookies
};

export default connect(
  null,
  {
    loadTasklist,
    loadSetting
  }
)(withCookies(LoginModal));
