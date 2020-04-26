import React, { Component } from "react";
import ValidationHoc from "../../../../../hoc/validationHoc"
import { reqUpdateUser } from "../../../../../api/api"
import { connect } from "react-redux";
import InputComponent from "../../../../../hoc/inputComponent";

// TODO @SONIA

class BillingAddress extends React.Component {
    constructor() {
        super();

    }
    componentDidMount() {
        this.props.setHocData(this.props.userData)
    }
    render() {
        return (
            <div>
                <p>Your billing address will be verified before you can receive payments.</p>
                {
                    [{ title: "Address Line 1", name: "addressLine1" },
                    { title: "Address Line 2 (Optional)", name: "addressLine2" },
                    { title: "Surburb", name: "suburb" },
                    { title: "State", name: "state" },
                    { title: "Postcode", name: "postCode" },
                    { title: "Country", name: "country" }]
                        .map(item =>
                            <div className="form__content--item">
                                <InputComponent {...this.props} title={item.title} name={item.name} />
                            </div>
                        )
                }

                <button className="green-button"
                    onClick={async () => {
                        if (await this.props.okToSubmit()) {
                            const result = await reqUpdateUser(this.props.user.email, { billingAddr: this.props.values });
                            if (result.status === 200) {
                                alert(`succeed to add billing address!`);
                            }
                        }
                    }}>
                    Add billing address
                </button>
                <p>Your address will never been shown publicly, it is only used for account verification purposes.</p>
            </div>
        );
    }
}

export default connect(state => ({ user: state.user }), {})(
    ValidationHoc(BillingAddress, ["addressLine1", "suburb", "state", "postCode", "country"]));