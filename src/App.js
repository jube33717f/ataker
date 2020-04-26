import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import BrowseTasks from "./pages/browse-tasks/browse-tasks";
import Home from "./pages/home/home";
import AccountPage from "./pages/account-page/account-page";
import NotFound from "./pages/not-found/not-found";
import NavBar from "./components/nav-bar/nav-bar";
import LoginForm from "./pages/auth/login-form";
import SignUpForm from "./pages/auth/signup-form";
import ReplyForm from "./pages/browse-tasks/browse-tasks-right/task-detail/reply-form/reply-form";

import PostTask from "./pages/post-task/post-task";
import MyTasks from "./pages/browse-tasks/my-tasks/my-tasks";
import "./App.scss";
import MakeAnOffer from "./pages/make-an-offer/make-an-offer";
import LeaveReview from "./pages/leave-review/leave-review"
export default class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/browse-tasks" component={BrowseTasks} />
          <Route path="/account/*" component={AccountPage} />
          <Route path="/my-tasks" component={MyTasks} />
          <Route path="/not-found" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
        <Route path="/*/login" component={LoginForm} />
        <Route path="/*/signup" component={SignUpForm} />
        <Route path="/*/post" component={PostTask} />
        <Route path="/*/edit/*-:id" component={PostTask} />
        <Route path="/*/post-similar/*-:id" component={PostTask} />
        <Route path="/*/make-an-offer/*-:id" component={MakeAnOffer} />
        <Route path="/*/update-offer/*-:id" component={MakeAnOffer} />
        <Route path="/*/reply-offer-:targetId" component={ReplyForm} />
        <Route path="/*/reply-question-:targetId" component={ReplyForm} />
        <Route path="/*/leave-review/*-:id" component={LeaveReview} />
      </Router>
    );
  }
}
