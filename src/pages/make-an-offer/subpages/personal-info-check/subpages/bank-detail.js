import React, { Component } from "react";
import { connect } from "react-redux";
import { reqUpdateUser } from "../../../../../api/api";
import ValidationHoc from "../../../../../hoc/validationHoc";
import InputComponent from "../../../../../hoc/inputComponent";
// TODO @SONIA

class BankDetail extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.setHocData(this.props.userData)
    }

    render() {
        return (
            <div>
                <p>Please provide your bank details so you can get paid. We don't take any money from your account.</p>
                {
                    [{ title: "Account holder name", name: "name" },
                    { title: "Account number", name: "accountNumber" },
                    { title: "Bsb", name: "accountBsb" }]
                        .map(item =>
                            <div className="form__content--item">
                                <InputComponent {...this.props} title={item.title} name={item.name} inputClassName="input-area" />
                            </div>
                        )
                }

                <button className="green-button"
                    onClick={async () => {
                        if (await this.props.okToSubmit()) {
                            const result = await reqUpdateUser(this.props.user.email, { bankDetail: this.props.values });
                            if (result.status === 200) {
                                alert(`succeed to add bank detail!`);
                            }
                        }
                    }}
                >
                    Add
                </button>
            </div>


        );
    }
}
export default connect(state => ({ user: state.user }), {})(
    ValidationHoc(BankDetail, ["name", "accountNumber", "accountBsb"])
);