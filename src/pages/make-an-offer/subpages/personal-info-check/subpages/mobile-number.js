import React, { Component } from "react";
import ValidationHoc from "../../../../../hoc/validationHoc"
import InputComponent from "../../../../../hoc/inputComponent";
import { reqUpdateUser } from "../../../../../api/api"

import { connect } from "react-redux";
// TODO @SONIA

class MobileNumber extends React.Component {
    constructor() {
        super();

    }
    componentDidMount() {
        this.props.setHocData({ mobileNumber: this.props.userData })
    }
    render() {
        return (
            <div className="">
                <InputComponent {...this.props} title="Mobile Number" name="mobileNumber" inputClassName="input-area" />
                <button
                    onClick={async (e) => {
                        if (await this.props.okToSubmit()) {
                            const result = await reqUpdateUser(this.props.user.email, this.props.values);
                            if (result.status === 200) {
                                alert(`succeed to add mobile number! `);
                            }
                        }
                    }}
                    className="green-button">
                    Save Number</button>
            </div>
        );
    }
}
export default connect(state => ({ user: state.user }), {})(
    ValidationHoc(MobileNumber));