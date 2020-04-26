import React, { Component } from "react";
import ValidationHoc from "../../hoc/validationHoc";
import BlurBackgroundHoc from "../../hoc/blurBackgroundHoc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { reqSignUp } from "../../api/api";
import { withRouter } from "react-router-dom";
import facebookIcon from "../../assets/facebook.png";
import googleIcon from "../../assets/google.png";
import InputComponent from "../../hoc/inputComponent";
import { deleteLastSubPath } from "../../utils/path-generator"
import "./auth.scss"
// TODO @SONIA

class SignUpForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.blurBackground();

  }
  componentWillUnmount() {
    this.props.resetBackground();
  }

  handleSubmit = async () => {
    const { pathname } = this.props.history.location;
    if (await this.props.okToSubmit()) {
      try {
        const result = await reqSignUp(this.props.values);
        if (result.status === 201) {
          this.props.history.push(
            `${deleteLastSubPath(pathname)}/login`,
            { signupValues: this.props.values }
          );
        }
      } catch (error) {
        alert(error.response.data);
        if (error.response.status === 400) {
          this.props.history.push(
            `${deleteLastSubPath(pathname)}/login`,
            { signupValues: { email: this.props.values.email } }
          );
        }
      }
    }
  }

  render() {
    const { pathname } = this.props.history.location;
    return (
      <div className="container">
        <div className="container--not-blured">
          <div className="auth-form">
            <div className="form__header">
              <div>
                Join us
                <FontAwesomeIcon icon={faWindowClose} className="button-close"
                  onClick={() => {
                    this.props.history.push(deleteLastSubPath(pathname))
                  }} />
              </div>
            </div>
            <div className="auth-form__content">
              <InputComponent {...this.props} title="Email" name="email" placeholder="Email" />
              <InputComponent {...this.props} title="Password" name="password" placeholder="Password" type="password" />
              <div>
                <InputComponent {...this.props} title="Username" name="username" placeholder="Username" />
                <InputComponent {...this.props} title="Age" name="age" placeholder="Age" type="number" />
              </div>
            </div>

            <div className="bottom-buttons">
              <button onClick={this.handleSubmit}>
                Join Airtasker
              </button>
            </div>

            <div className="seperator-wrapper">or sign up with</div>

            <div className="bottom-buttons bottom-buttons--social-media">
              <button><img src={facebookIcon} />Facebook</button>
              <button><img src={googleIcon} />Google</button>
            </div>

            <div className="auth-form__bottom-section">
              Already have an account?
            <button className="blue-link"
                onClick={() => {
                  this.props.history.push(`${deleteLastSubPath(pathname)}/login`);
                }}>
                Log in
            </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default BlurBackgroundHoc(ValidationHoc(withRouter(SignUpForm), ['email', 'password', 'username', 'age']));