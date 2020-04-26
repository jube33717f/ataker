import React from "react";
import "./side-bar.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { addTaskDetail, addUserRole, clearTaskDetail, reloadTaskDetail } from "../../../../../redux/actions"
import { reqUpdateTask, reqTaskDetail } from "../../../../../api/api"
// TODO @SONIA

class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      menuToggle: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.setState({ menuToggle: false })
    }
  }

  pushToGeneratedUrl = (pathname) => {
    this.props.history.push(
      `${this.props.match.url}/${pathname}/${this.props.match.params[0]}-${this.props.match.params.id}`
    );
  }

  releasePayment = async () => {
    const taskId = this.props.match.params.id;
    try {
      const result = await reqUpdateTask(taskId, { status: 'completed' });
      const taskDetailResult = await reqTaskDetail(taskId);
      this.props.addTaskDetail(taskDetailResult.data)
    } catch (error) {
      alert("failed to release payment");///
    }
  }

  requestPayment = async () => {
    const taskId = this.props.match.params.id;
    try {
      const result = await reqUpdateTask(taskId, { status: 'assigned-topay' });
      const taskDetailResult = await reqTaskDetail(taskId);
      this.props.addTaskDetail(taskDetailResult.data)
    } catch (error) {
      alert("failed to request payment");///
    }
  }


  render() {
    const { taskData, userRole } = this.props.taskDetail;
    const { status } = taskData && taskData.taskDetail;
    const { price, offers } = taskData && taskData.taskDetail;
    return (
      <div className="side-bar">
        <div className="side-bar__payment">
          <div className="payment__title">TASK BUDGET</div>
          <div className="payment__price">
            <h2>$</h2>
            <h2>{price}</h2>
          </div>
          {userRole !== "poster"
            ?
            (
              (status === "assigned" && userRole === "assignee"
                &&
                <div className="green-button " onClick={this.requestPayment}>Request Payment</div>
              ) ||
              (status === "assigned-topay" && userRole === "assignee"
                &&
                <div className="green-button button--disabled">Awaiting Payment</div>
              )
              ||
              (status === "assigned"
                &&
                <div className="green-button button--disabled">Assigned</div>
              ) ||
              (status === "completed" && userRole === "assignee"
                &&
                <div className="green-button">Leave Review</div>
              ) ||
              (status === "completed"
                &&
                <div className="green-button button--disabled">Completed</div>
              ) ||
              (status === "reviewed"
                &&
                <div className="green-button button--disabled">Reviewed</div>
              ) ||
              (status === "open" && (offers && offers.find(offer => offer.email === this.props.user.email))
                &&
                <>
                  <div className="side-bar__padder--blue">You offered ${offers.find(offer => offer.email === this.props.user.email).price}</div>
                  <div className="green-button" onClick={() => {
                    this.pushToGeneratedUrl('update-offer')
                  }}>
                    Update your offer
                  </div>
                </>
              ) ||
              (status === "open"
                &&
                <div className="green-button" onClick={() => {
                  //如果没登陆的话自动跳转登陆
                  if (!this.props.user.email) {
                    this.props.history.push(`${this.props.match.url}/login`);
                  } else {
                    this.pushToGeneratedUrl('make-an-offer')
                  }
                }}>
                  Make an offer
                </div>
              )
            )
            :
            (status === "open"
              &&
              <div className="green-button" onClick={() => {
                this.pushToGeneratedUrl('review-offers')
              }}>
                Review offers
                </div>
            ) ||
            (status === "assigned"
              &&
              <div className="green-button" onClick={() => {
                this.pushToGeneratedUrl('private-message')
              }}>
                Private Message
              </div>
            ) ||
            (status === "assigned-topay"
              &&
              <div className="green-button" onClick={() => {
                this.releasePayment();
                this.pushToGeneratedUrl('release-payment')
              }}>
                Release Payment
              </div>
            ) ||
            (status === "completed"
              &&
              <div className="green-button" onClick={() => {
                this.pushToGeneratedUrl('leave-a-review')
              }}>
                Leave Review
              </div>
            ) ||
            (status === "reviewed"
              &&
              <div className="green-button button--disabled">Reviewed</div>
            )

          }
        </div>


        <div className="more-options__header" onClick={() => { this.setState({ menuToggle: !this.state.menuToggle }) }}>
          <span>
            More Options
          </span>
          <FontAwesomeIcon icon={faSortDown} />
        </div>

        {this.state.menuToggle && (
          <div className="more-options__dropdown-menu">
            {userRole === "poster" && <div className="option" onClick={() => {
              //TODO: 如果没登录的话先post/edit然后最后提示登录，登录成功后再跳转
              if (!this.props.user.email) {
                this.props.history.push(`${this.props.match.url}/login`);
              } else {
                this.pushToGeneratedUrl('edit')
              }
            }}>
              Edit Task
            </div>
            }

            <div className="option" onClick={() => {
              //TODO: 如果没登录的话先post/edit然后最后提示登录，登录成功后再跳转
              if (!this.props.user.email) {
                this.props.history.push(`${this.props.match.url}/login`);
              } else {
                this.pushToGeneratedUrl('post-similar')
              }
            }}>
              Post a Similar Task
            </div>

            <div className="option">Set up Alerts</div>

            {taskData.status === "open" && userRole === "poster"
              &&
              <div className="option">Cancel Task</div>
            }
          </div>
        )
        }
      </div>

    );
  }
}
export default connect(state => ({ user: state.user, taskDetail: state.taskDetail }), { addUserRole, addTaskDetail })(
  withRouter(SideBar)
);
