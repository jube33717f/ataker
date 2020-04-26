import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import BrowseTasksLeft from "./browse-tasks-left/browse-tasks-left";
import TaskMenu from "./task-menu/task-menu";
import MapBox from "./browse-tasks-right/map-box/map-box";
import TaskDetail from "./browse-tasks-right/task-detail/task-detail";
import "./browse-tasks.scss";
import { GoogleApiWrapper, } from 'google-maps-react';
// TODO @SONIA
class BrowseTasks extends Component {
  render() {
    return (<>
      <TaskMenu google={this.props.google} />
      <div className="browsepage">
        <div className="browsepage__container">
          <div className="browsepage__container--left">
            <BrowseTasksLeft />
          </div>
          <div className="browsepage__container--right">
            <Switch>
              <Route path={`${this.props.match.path}/*-:id`} component={TaskDetail} />
              <Route component={MapBox} />
            </Switch>
          </div>
        </div>
      </div></>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDy7fG8VcN_upR7UZ7lC63h7cVbVwYu558',
  // libraries: ["places",'geocoding']
})(BrowseTasks);