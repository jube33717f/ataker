import React, { Component } from "react";
import ValidationHoc from "../../hoc/validationHoc";
import BlurBackgroundHoc from "../../hoc/blurBackgroundHoc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import  facebookIcon  from "../../assets/facebook.png";
import googleIcon  from "../../assets/google.png";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, logoutUser } from "../../redux/actions";
import InputComponent from "../../hoc/inputComponent";
import {deleteLastSubPath} from "../../utils/path-generator"
import "./auth.scss";
// TODO @SONIA

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.blurBackground();
    if (this.props.location.state) {
      this.props.setHocData({ ...this.props.location.state.signupValues })
    }
  }
  componentWillUnmount() {
    this.props.resetBackground();
  }

  async componentDidUpdate(prevProps, prevState) {

    //监听props.user。每改变一下email和password，state和props改变，就会重新渲染。
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
      if (Object.keys(this.props.user).length !== 0) {
        if (this.props.user.errMsg) {
          alert(this.props.user.errMsg);
          //处理两次失败请求
          this.props.logoutUser(); //改变redux里的状态，第二次失败请求触发componentdidupdate
        } else {
          const {pathname} = this.props.location;
          if (this.props.match.params[0] === 'home') {
            this.props.history.push("/account/dashboard");
          } else {
            this.props.history.push(deleteLastSubPath(pathname));
          }
        }
      }
    }
  }

  render() {
    const {pathname} = this.props.history.location;
    return (
      <div className="container">
        <div className="container--not-blured">
          <div className="auth-form">
            <div className="form__header">
              <div>
                Log in
                <FontAwesomeIcon icon={faWindowClose} className="button-close" 
                  onClick={() => { 
                    this.props.history.push(deleteLastSubPath(pathname))
                  }} />
              </div>
            </div>

            <div className="auth-form__content">
                <InputComponent {...this.props} title="Email" name="email" placeholder="Email"/>
                <InputComponent {...this.props} title="Password" name="password" placeholder="Password" type="password" />
              <Link to="" className="blue-link">Forget password?</Link>
            </div>
                
            <div className="bottom-buttons">
              <button
                onClick={async () => {
                  if (await this.props.okToSubmit()) {
                    this.props.login(this.props.values);
                  }
                }}>
                Log in
              </button>
            </div>
        
            <div className="seperator-wrapper">or login with</div>

            <div className="bottom-buttons bottom-buttons--social-media">
              <button><img src={facebookIcon}/>Facebook</button>
              <button><img src={googleIcon}/>Google</button>
            </div>
          
            <div className="auth-form__bottom-section">
              Don't have an account?
            
            <button className="blue-link"
                onClick={() => {
                  this.props.history.push(
                    `${deleteLastSubPath(pathname)}/signup`
                  );
                }}>
                Sign up
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }), { login, logoutUser })(
  BlurBackgroundHoc(ValidationHoc(withRouter(LoginForm), ['email', 'password']))
);

