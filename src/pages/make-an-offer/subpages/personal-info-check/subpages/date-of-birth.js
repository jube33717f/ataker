import React, { Component } from "react";
import ValidationHoc from "../../../../../hoc/validationHoc"
import InputComponent from "../../../../../hoc/inputComponent";

import { reqUpdateUser } from "../../../../../api/api"
import { connect } from "react-redux";
// TODO @SONIA

class DateOfBirth extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const dateOfBirth = this.props.userData;
        if (dateOfBirth)
            this.props.setHocData({ dateOfBirth, year: dateOfBirth.split('-')[0], month: dateOfBirth.split('-')[1], date: dateOfBirth.split('-')[2] })
    }

    render() {
        const { year, month, date } = this.props.values;
        return (
            <div>
                {
                    [{ title: "Year", name: "year" },
                    { title: "Month", name: "month" },
                    { title: "Date", name: "date" }]
                        .map(item =>
                            <InputComponent {...this.props} title={item.title} name={item.name} inputClassName="input-area" />
                        )
                }

                <button
                    onClick={async (e) => {
                        await this.props.setHocData({ dateOfBirth: `${year}-${month}-${date}` })
                        if (await this.props.okToSubmit()) {
                            const result = await reqUpdateUser(this.props.user.email, { dateOfBirth: `${year}-${month}-${date}` });
                            if (result.status === 200) {
                                alert(`succeed to add birthday!`);
                            }
                        }
                    }}
                    className="green-button">
                    Save Birthday
                </button>

                <div className="error-message">{this.props.errors.dateOfBirth}</div>
            </div>
        );
    }
}
export default connect(state => ({ user: state.user }), {})(
    ValidationHoc(DateOfBirth));