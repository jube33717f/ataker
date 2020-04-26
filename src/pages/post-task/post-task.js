import React, { Component } from "react";
import BlurBackgroundHoc from "../../hoc/blurBackgroundHoc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import TaskBudget from "./subpages/taskBudget/taskBudget"
import TaskDescription from "./subpages/taskDescription/taskDescription"
import TaskLocationAndTime from "./subpages/taskLocationAndTime/taskLocationAndTime"
import { connect } from "react-redux"
import { clearPostTask, reloadTaskDetail, reloadTaskList } from "../../redux/actions"
import { withRouter } from "react-router-dom"
import { GoogleApiWrapper, } from 'google-maps-react';
import TaskLAT from "./subpages/taskLocationAndTime/taskLAT"
import "./post-task.scss"
import { reqPostTask, reqUpdateTask } from "../../api/api";

// TODO @SONIA
class PostTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageMovementDirection: '',
        }
    }

    async componentDidMount() {
        this.props.blurBackground();
        this.setState({ pageNum: 1 })
    }

    componentWillUnmount() {
        this.props.resetBackground();
        this.props.clearPostTask();
    }

    render() {
        return (
            <div className="container">
                <div className="container--not-blured">
                    <div className="posttask-form">
                        <div className="form__header">
                            <div>
                                {this.state.pageNum === 1 && 'Tell us what you need done?'}
                                {this.state.pageNum === 2 && 'Say where & when'}
                                {this.state.pageNum === 3 && 'Suggest how much'}
                                <FontAwesomeIcon icon={faWindowClose} className="button-close"
                                    onClick={() => {
                                        this.props.history.goBack();
                                    }} />
                            </div>
                            <div className={`progress-bar ${
                                (this.state.pageNum === 1 && "first-page") ||
                                (this.state.pageNum === 2 && "second-page") ||
                                (this.state.pageNum === 3 && "third-page")
                                }`}></div>
                        </div>

                        {this.state.pageNum === 1 &&
                            <TaskDescription pageNum={this.state.pageNum}
                                pageMovementDirection={this.state.pageMovementDirection} />
                        }

                        {this.state.pageNum === 2 &&
                            <TaskLAT pageNum={this.state.pageNum}
                                pageMovementDirection={this.state.pageMovementDirection} />

                        }

                        {this.state.pageNum === 3 &&
                            <TaskBudget pageNum={this.state.pageNum}
                                pageMovementDirection={this.state.pageMovementDirection} />
                        }

                        <div className="bottom-buttons">
                            {this.state.pageNum > 1
                                &&
                                <button onClick={() => {
                                    this.setState({ pageNum: this.state.pageNum - 1, pageMovementDirection: 'backward-movement' })
                                }}>
                                    Before
                                </button>
                            }
                            {this.state.pageNum < 3
                                ?
                                <button onClick={async () => {
                                    if (await this.props.postTask.validationHocCheck()) {
                                        this.setState({ pageNum: this.state.pageNum + 1, pageMovementDirection: 'forward-movement' });
                                    }
                                }}>
                                    Next
                                </button>
                                :
                                <button onClick={async () => {
                                    if (await this.props.postTask.validationHocCheck()) {
                                        try {
                                            const { taskData } = this.props.postTask;
                                            const dataToSend = {
                                                title: taskData.taskTitle,
                                                detail: taskData.taskDetail,
                                                place: taskData.taskLocation,
                                                place_coordinate: taskData.taskLocationCoordinate,
                                                dueDate: taskData.taskDuedate,
                                                price: taskData.taskBudget
                                            };
                                            let result;
                                            const path = this.props.match.path;
                                            if (path.includes("post")) {
                                                result = await reqPostTask(
                                                    this.props.user.email,
                                                    dataToSend
                                                );//这里email和taskdata的顺序不能错，不然会有cors？
                                            } else {
                                                result = await reqUpdateTask(
                                                    this.props.match.params.id,
                                                    dataToSend
                                                );
                                            }
                                            if (result.status === 200) {
                                                this.props.reloadTaskList(true);

                                                if (path.includes("edit")) {
                                                    this.props.reloadTaskDetail(true);
                                                }
                                                this.props.history.goBack();
                                            }
                                        } catch (error) {
                                            // alert("failed to post task");
                                            this.props.history.goBack();///
                                            this.props.reloadTaskList(true);///
                                            this.props.reloadTaskDetail(true);///
                                        }
                                        // alert(JSON.stringify(this.props.postTask.taskData))
                                    }
                                }}>
                                    Get quotes
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({ postTask: state.postTask, user: state.user }), { clearPostTask, reloadTaskDetail, reloadTaskList })(
    withRouter(BlurBackgroundHoc(PostTask)));

// export default ;
// export default GoogleApiWrapper({
//         apiKey: 'AIzaSyDy7fG8VcN_upR7UZ7lC63h7cVbVwYu558',
//         libraries: ["places",'geocoding']
//       },
//     connect(state => ({ postTask: state.postTask ,user: state.user}), { clearPostTask , reloadTaskDetail})(withRouter(BlurBackgroundHoc(PostTask)))
//         )(PostTask); 
