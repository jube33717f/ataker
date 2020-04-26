import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import SideBar from "./side-bar/side-bar";
import LeftPanel from "./left-panel/left-panel";
import OfferSection from "./offer-section/offer-section";
import QuestionSection from "./question-section/question-section";
import { reqTaskDetail } from "../../../../api/api";
import { addTaskDetail, addUserRole, clearTaskDetail, reloadTaskDetail } from "../../../../redux/actions"
import "./task-detail.scss";

// TODO @SONIA
class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.rightPageRef = React.createRef();
  }

  async componentDidMount() {
    await this.requestTaskData();
    this.getUserRole();
    this.rightPageRef.current.style.left = "0px";
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!this.props.location.pathname.includes('reply-')) {

      const taskId = this.props.match.params.id;
      if (prevProps.match.params.id !== this.props.match.params.id) {
        // || prevProps.taskDetail.taskData.taskDetail.id !== this.props.taskDetail.taskData.id) {
        await this.requestTaskData();
        this.getUserRole();
      }
      if (prevProps.user.email !== this.props.user.email) {
        this.getUserRole();
      }

    }
    if (this.props.taskDetail.readyToReload) {
      await this.requestTaskData();
      this.props.reloadTaskDetail(false)
    }
  }

  componentWillUnmount() {
    this.props.clearTaskDetail();
  }

  requestTaskData = async () => {

    let taskId = this.props.match.params.id;

    try {
      const result = await reqTaskDetail(taskId);
      if (result.status === 200) {
        this.props.addTaskDetail(result.data)
      }
    } catch (error) {

      // alert("failed to request task detail");
    }



  }

  getUserRole() {
    const posterEmail = this.props.taskDetail.taskData.taskDetail ? this.props.taskDetail.taskData.taskDetail.posterInfo.email : '';
    const { offers } = this.props.taskDetail.taskData;
    const userEmail = this.props.user.email;
    if (userEmail === posterEmail) {
      this.props.addUserRole("poster")
    }
    else if (offers && offers.length !== 0 && offers[0].taskerInfo && offers[0].taskerInfo.email === userEmail) {
      this.props.addUserRole("assignee")
    } else {
      this.props.addUserRole("")
    }
  }

  render() {
    return (
      <div className="task-detail" ref={this.rightPageRef}>
        <div className="task-detail__left">
          <LeftPanel />
          <OfferSection />
          <QuestionSection />
        </div>
        <div className="task-detail__right">
          <SideBar />
        </div>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user, taskDetail: state.taskDetail }), { addTaskDetail, addUserRole, clearTaskDetail, reloadTaskDetail })(
  withRouter(TaskDetail)
);
