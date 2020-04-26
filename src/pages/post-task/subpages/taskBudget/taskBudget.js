import React, { Component } from "react";
import InputComponent from "../../../../hoc/inputComponent";
import ValidationHoc from "../../../../hoc/validationHoc";
import { connect } from "react-redux";
import { addTask, setValidationHocCheck } from "../../../../redux/actions"
import { withRouter } from "react-router-dom";
// TODO @SONIA

class TaskBudget extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        const { budgetCalMethod, budgetHourlyRate, budgetHours, taskBudget } = this.props.postTask.taskData;
        this.props.setHocData({ budgetCalMethod, budgetHourlyRate, budgetHours, taskBudget })
        this.props.setValidationHocCheck(this.props.okToSubmit)
        const taskId = this.props.match.params.id
        if (taskId && !this.props.postTask.taskData.taskBudget && this.props.taskDetail.taskData) {
            const { price } = this.props.taskDetail.taskData.taskDetail;
            const taskData = { taskBudget: price };
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
            <>
                <div className={`form__content ${this.props.pageMovementDirection}`}>
                    <div className="form__content--item">
                        <label htmlFor="budgetCalMethod"> What is your budget?</label>
                        {/* 这里label怎么写 */}
                        <p>Please enter the price you're comfortable to pay to get your task done. Taskers will use this as a guide for how much to offer.</p>
                        <div className="tab-container--inline">

                            <div className="tab-option--header">
                                <InputComponent {...this.props}
                                    name="budgetCalMethod" value="byTotal" type="radio"
                                    inputClassName="input-option" errorClassName="input-option--hide" />
                                <div className={this.props.values.budgetCalMethod !== "byHours" ? "input-option--dot" : ''}></div>
                                <span>Total</span>
                            </div>

                            <div className="tab-option--header">
                                <InputComponent {...this.props}
                                    name="budgetCalMethod" value="byHours" type="radio"
                                    inputClassName="input-option" errorClassName="input-option--hide" />
                                <div className={this.props.values.budgetCalMethod === "byHours" ? "input-option--dot" : ''}></div>
                                <span>Hourly rate</span>
                            </div>

                        </div>

                        <div className="input-section--inline">

                            <div className="input-section--inline-item" >
                                <input
                                    className={this.props.errors.taskBudget ? "input-area input-area--invalid" : "input-area"}
                                    onChange={(e) => {
                                        if (this.props.values.budgetCalMethod !== "byHours") {
                                            this.props.setHocData({ taskBudget: e.target.value })
                                        } else {
                                            this.props.setHocData({ budgetHourlyRate: e.target.value, taskBudget: e.target.value * (this.props.values.budgetHours || 1) })
                                        }
                                    }}
                                    value={this.props.values.budgetCalMethod !== "byHours" ?
                                        this.props.values.taskBudget : this.props.values.budgetHourlyRate
                                    }
                                    type="number"
                                />
                                {this.props.values.budgetCalMethod === "byHours" && <div className="unit">/hr</div>}
                            </div>

                            <div className="input-section--inline-item" >
                                {this.props.values.budgetCalMethod === "byHours" && <>
                                    <span>X</span>
                                    <input
                                        className="input-area"
                                        onChange={(e) => {
                                            this.props.setHocData({ budgetHours: e.target.value, taskBudget: e.target.value * (this.props.values.budgetHourlyRate || 1) })
                                        }}
                                        value={this.props.values.budgetHours}
                                        type="number"
                                    /></>}
                                {this.props.values.budgetCalMethod === "byHours" && <div className="unit">hrs</div>}
                            </div>

                        </div>

                        <div className="error-message">{this.props.errors.taskBudget}</div>

                    </div>
                </div>

                <div className="price-banner">
                    <div className="price-banner__title">
                        <h3>ESTIMATED BUDGET</h3>
                        <h4>Final payment will be agreed later</h4>
                    </div>
                    <div className="price-banner__price">
                        <h2>{this.props.values.taskBudget}$</h2>
                    </div>
                </div>

            </>
        );
    }
}

export default connect(state => ({ postTask: state.postTask, taskDetail: state.taskDetail }), { addTask, setValidationHocCheck })(
    ValidationHoc(withRouter(TaskBudget), ["taskBudget"]));
