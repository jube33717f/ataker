import React, { Component } from "react";
import { Route, Redirect, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PaymentHistory from "./payment-history/payment-history";
import PaymentMethod from "./payment-method/payment-method";
import PersonalProfile from "./personal-profile/personal-profile";
import NotificationSettings from "./notification-settings/notification-settings";
import Notifications from "./notifications/notifications";
import Dashboard from "./dashboard/dashboard";
import { reqUserInfo } from "../../api/api";
import "./account-page.scss";
const { BASE } = global.constants
// TODO @SONIA
class AccountPage extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        email: "sample email",
        username: "sample user"
      }
    };
  }

  async requestData() {
    try {
      const result = await reqUserInfo(this.props.user.email);
      if (result.status === 200) {
        this.setState({ userInfo: result.data });
      } else {
        alert("User does not exist! Please check if you have logged in first!");
      }
    } catch (error) {
      alert("failed to make a request!");
    }
  }

  async componentDidMount() {
    await this.requestData();
  }
  render() {
    const { userInfo } = this.state;
    return (
      <div className="account-page">
        <div className="account-page__nav-bar">
          <div className="account-page__nav-bar--icon"><img src={userInfo.photo && `${BASE}/upload/${userInfo.photo.filename}`} /></div>
          <div className="account-page__nav-bar--name">{userInfo.username}</div>
          <ul>
            <li>
              <Link to="/account/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/account/notification-settings">
                Notification Settings
              </Link>
            </li>
            <li>
              <Link to="/account/notifications">Notification Settings</Link>
            </li>
            <li>
              <Link to="/account/payment-history">Payment History</Link>
            </li>
            <li>
              <Link to="/account/payment-method">Payment Method</Link>
            </li>
            <li>
              <Link to="/account/personal-profile">Personal Profile</Link>
            </li>
          </ul>
        </div>
        <div className="account-page__content">
          <Switch>
            <Route
              path="/account/notification-settings"
              component={NotificationSettings}
            />
            <Route path="/account/notifications" component={Notifications} />
            <Route path="/account/payment-history" component={PaymentHistory} />
            <Route path="/account/payment-method" component={PaymentMethod} />
            <Route
              path="/account/personal-profile"
              component={PersonalProfile}
            />
            <Route component={Dashboard} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }))(AccountPage);
