import React, { Component } from "react";
import { connect } from "react-redux";
import "./personal-info-check.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpload } from "@fortawesome/free-solid-svg-icons";
import BankDetail from "./subpages/bank-detail";
import BillingAddress from "./subpages/billing-address";
import DateOfBirth from "./subpages/date-of-birth";
import UploadPhoto from "./subpages/upload-photo";
import MobileNumber from "./subpages/mobile-number";
import { reqUserInfo } from "../../../../api/api";
import { checkUser } from "../../../../redux/actions"
// TOTEST: reqUserInfo

// TODO @SONIA

class PersonalInfoCheck extends Component {
    constructor() {
        super();
        this.state = {
            selectedFieldIndex: 0,
            userInfo: '',
            validFields: '',
            fieldsToComplete: []
        }
    }

    async componentDidMount() {
        try {
            const result = await reqUserInfo(this.props.user.email);
            if (result.status === 200) {
                this.setState({ userInfo: result.data });
                this.updateValidFields(result.data);
            } else {
                alert("User does not exist in fakeData.js!");
            }
        } catch (error) {
            alert("failed to make a request!");
        }
    }

    updateValidFields = (userInfo) => {
        let validFields = [];
        if (Object.keys(userInfo).length > 0) {
            userInfo.photo && validFields.push('photo');
            userInfo.dateOfBirth && validFields.push('dateOfBirth');
            userInfo.mobileNumber && validFields.push('mobileNumber');
            userInfo.bankDetail && Object.keys(userInfo.bankDetail).length > 0 && validFields.push('bankDetail');
            userInfo.billingAddr && Object.keys(userInfo.billingAddr).length > 0 && validFields.push('billingAddr');
        }
        this.setState({ validFields });
    }

    async componentDidUpdate(prevProps, prevState) {
        // update userInfo everytime changing page.
        if (this.state.selectedFieldIndex !== prevState.selectedFieldIndex) {
            const result = await reqUserInfo(this.props.user.email);
            if (result.status === 200) {
                this.setState({ userInfo: result.data });
                this.updateValidFields(result.data);
            } else {
                alert("User does not exist in fakeData.js!");
            }
            const fieldsToComplete = ['photo', 'bankDetail', 'billingAddr', 'dateOfBirth', 'mobileNumber']
                .filter(field => !this.state.validFields.includes(field))
            this.setState({ fieldsToComplete });
        }
    }
    render() {
        const { selectedFieldIndex } = this.state;

        return (
            <div className="info-check-form">
                {selectedFieldIndex === 0 &&
                    <ul>
                        {
                            [{ fieldName: 'photo', labelName: 'Upload a Profile Picture', placeholder: 'Upload your photo' },
                            { fieldName: 'bankDetail', labelName: 'Provide your bank account details', placeholder: 'Enter your bank details' },
                            { fieldName: 'billingAddr', labelName: 'Provide a Billing Address', placeholder: 'Enter your billing address' },
                            { fieldName: 'dateOfBirth', labelName: 'Provide a Date of Birth', placeholder: 'Enter your date of birth' },
                            { fieldName: 'mobileNumber', labelName: 'Provide a Mobile Number', placeholder: 'Enter your mobile number' }]
                                .map((item, index) =>
                                    <li>
                                        <label>{item.labelName}</label>
                                        <div className={`info-check-form__item ${this.state.fieldsToComplete.includes(item.fieldName) && 'info-check-form__item--error'}`}
                                            onClick={() => this.setState({ selectedFieldIndex: index + 1 })}>
                                            <div>
                                                <div className={`form-tick ${this.state.validFields.includes(item.fieldName) && "form-tick-on"}`}></div>
                                                <label>{item.placeholder}</label>
                                            </div>
                                            <FontAwesomeIcon icon={faArrowRight} className="icon__arrow-right" />
                                        </div>
                                    </li>
                                )
                        }
                    </ul>
                }
                {selectedFieldIndex === 1 && <UploadPhoto userData={this.state.userInfo.photo} />}
                {selectedFieldIndex === 2 && <BankDetail userData={this.state.userInfo.bankDetail} />}
                {selectedFieldIndex === 3 && <BillingAddress userData={this.state.userInfo.billingAddr} />}
                {selectedFieldIndex === 4 && <DateOfBirth userData={this.state.userInfo.dateOfBirth} />}
                {selectedFieldIndex === 5 && <MobileNumber userData={this.state.userInfo.mobileNumber} />}

                <div className="bottom-buttons">
                    {selectedFieldIndex === 0
                        ?
                        <button onClick={() => {
                            if (this.state.validFields && this.state.validFields.length === 5) {
                                this.props.checkUser();//通知redux用户的所有信息都已齐全
                            } else {
                                //在相应的field显示提示信息
                                const fieldsToComplete = ['photo', 'bankDetail', 'billingAddr', 'dateOfBirth', 'mobileNumber'].filter(field => !this.state.validFields.includes(field))
                                this.setState({ fieldsToComplete })
                            }
                        }}> Next </button>
                        :
                        <button onClick={async () => {
                            this.setState({ selectedFieldIndex: 0 });
                            const result = await reqUserInfo(this.props.user.email);
                            if (result.status === 200) {
                                this.setState({ userInfo: result.data });
                                this.updateValidFields(result.data);
                            }
                        }}> Before </button>
                    }

                </div>

            </div>
        );
    }
}
export default connect(state => ({ user: state.user }), { checkUser })(PersonalInfoCheck);
