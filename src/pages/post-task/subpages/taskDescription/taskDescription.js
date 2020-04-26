import React, { Component } from "react";
import InputComponent from "../../../../hoc/inputComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ValidationHoc from "../../../../hoc/validationHoc";
import { connect } from "react-redux";
import { addTask, setValidationHocCheck } from "../../../../redux/actions"
import { withRouter } from "react-router-dom";
// TODO @SONIA
class TaskDescription extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        const { taskTitle, taskDetail } = this.props.postTask.taskData;
        this.props.setHocData({ taskTitle, taskDetail });
        this.props.setValidationHocCheck(this.props.okToSubmit)

        const taskId = this.props.match.params.id
        if (taskId && !this.props.postTask.taskData && this.props.taskDetail.taskData) {
            const { title, detail } = this.props.taskDetail.taskData.taskDetail;
            const taskData = { taskTitle: title, taskDetail: detail };
            this.props.setHocData(taskData);
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.props.addTask(this.props.values)
        }
    }
    render() {
        return (
            <div className={`form__content ${this.props.pageMovementDirection}`}>
                <div className="form__content--item">
                    <label htmlFor="taskTitle">What do you need done?</label>
                    <p>This'll be the title of your task - e.g. Help move my sofa</p>
                    <InputComponent {...this.props} name="taskTitle" label="taskTitle" inputClassName="input-area" />
                </div>
                <div className="form__content--item">
                    <label htmlFor="taskDetail">What are the details?</label>
                    <p>Be as specific as you can about what needs doing</p>
                    <InputComponent {...this.props} textareaOption={true} name="taskDetail" label="taskDetail" inputClassName="input-area" />
                </div></div>
        );
    }
}
export default connect(state => ({ postTask: state.postTask, taskDetail: state.taskDetail }), { addTask, setValidationHocCheck })(
    ValidationHoc(withRouter(TaskDescription), ["taskTitle", "taskDetail"]))

