import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import BlurBackgroundHoc from "../../hoc/blurBackgroundHoc";
import ValidationHoc from "../../hoc/validationHoc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import PersonalInfoCheck from "./subpages/personal-info-check/personal-info-check";
import PriceStatement from "./subpages/price-statement";
import OfferPreview from "./subpages/offer-preview";
import IntroMessage from "./subpages/intro-message";
import { reqUserInfo } from "../../api/api"
import { checkUser, reloadTaskDetail } from "../../redux/actions"
import { reqMakeOffer } from "../../api/api"
import "./make-an-offer.scss"
// TOTEST: reqUserInfo
// TODO @SONIA
class MakeAnOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageMovementDirection: ''
        }
    }

    updateValidFields = (userInfo) => {
        let validFields = [];
        if (Object.keys(userInfo).length > 0) {
            userInfo.photo && validFields.push('photo');
            userInfo.bankDetail && Object.keys(userInfo.bankDetail).length > 0 && validFields.push('bankDetail');
            userInfo.billingAddr && Object.keys(userInfo.billingAddr).length > 0 && validFields.push('billingAddr');
            userInfo.dateOfBirth && validFields.push('dateOfBirth');
            userInfo.mobileNumber && validFields.push('mobileNumber')
        }
        return validFields;
    }

    async componentDidMount() {
        this.props.blurBackground();
        let validFields = [];
        try {
            const result = await reqUserInfo(this.props.user.email);
            if (result.status === 200) {
                validFields = this.updateValidFields(result.data);
            }
        } catch (error) {
            alert('Failed to request user information.');
        }
        if (validFields.length === 5) {
            this.setState({ pageNum: 2 })
        } else {
            this.setState({ pageNum: 1 })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.offerDetail.offerData) { ////
            if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
                this.setState({ pageNum: this.props.user.readyToBid ? 2 : 1 })
            }
            if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
                if (this.props.user.readyToBid && this.state.pageNum === 1) {
                    this.setState({ pageNum: 2 })
                }
            }
        }

    }
    componentWillUnmount() {
        this.props.resetBackground();
    }
    render() {
        let path = this.props.history.location.pathname;
        return (
            <div className="container">
                <div className="container--not-blured">
                    <div className="offer-form">
                        <div className="form__header">
                            <div>
                                {this.state.pageNum === 1 && 'To start making money'}
                                {this.state.pageNum === 2 && 'Make an Offer'}
                                {this.state.pageNum === 3 && 'Make an Offer'}
                                {this.state.pageNum === 4 && 'Preview Offer'}
                                <FontAwesomeIcon icon={faWindowClose} className="button-close" onClick={() => { this.props.history.goBack() }} />
                            </div>
                        </div>

                        {/* 不能把 <div className={`form__content ${this.state.pageMovementDirection}`}></div> 放外面，不然只会重新渲染里面的东西 */}
                        {this.state.pageNum === 1 &&
                            <div className={`form__content ${this.state.pageMovementDirection}`}><PersonalInfoCheck /></div>}
                        {this.state.pageNum === 2 &&
                            <div className={`form__content ${this.state.pageMovementDirection}`}><PriceStatement /></div>}
                        {this.state.pageNum === 3 &&
                            <div className={`form__content ${this.state.pageMovementDirection}`}><IntroMessage /></div>}
                        {this.state.pageNum === 4 &&
                            <div className={`form__content ${this.state.pageMovementDirection}`}><OfferPreview /></div>}


                        {this.state.pageNum !== 1 &&
                            <div className="bottom-buttons">
                                {this.state.pageNum > 2
                                    &&
                                    <button onClick={() => {
                                        this.setState({ pageNum: this.state.pageNum - 1, pageMovementDirection: 'backward-movement' });
                                    }}> Before </button>
                                }
                                {this.state.pageNum < 4
                                    ?
                                    <button onClick={() => {
                                        if (this.state.pageNum === 2) {
                                            if (this.props.offerDetail.offerData.price) {
                                                if (this.props.offerDetail.offerData.price < this.props.taskDetail.taskData.taskDetail.price) {
                                                    alert('Please enter a price not less than required number.')
                                                } else {
                                                    this.setState({ pageNum: this.state.pageNum + 1, pageMovementDirection: 'forward-movement' });
                                                }
                                            } else {
                                                alert('Please enter a valid price.')
                                            }
                                        } else if (this.state.pageNum === 3) {
                                            if (!this.props.offerDetail.offerData.message) {
                                                alert('Please enter your message to poster.')
                                            } else if (this.props.offerDetail.offerData.message.length < 50) {
                                                alert('Message length should be more than 50 characters.')
                                            } else {
                                                this.setState({ pageNum: this.state.pageNum + 1, pageMovementDirection: 'forward-movement' });
                                            }

                                        }
                                    }
                                    }> Next </button>
                                    :
                                    <button onClick={async () => {
                                        try {
                                            const offerData = {
                                                taskId: this.props.match.params.id,
                                                ...this.props.offerDetail.offerData
                                            }
                                            const result = await reqMakeOffer(this.props.user.email, offerData);
                                            if (result.status === 200) {
                                                alert('Succeed to make an offer!');
                                                this.props.reloadTaskDetail(true);
                                            }
                                        } catch (e) {
                                            alert('Failed to make an offer!');
                                        }
                                        this.props.history.goBack();
                                    }}> Submit offer </button>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div >
        )
    }
}
export default connect(state => ({ user: state.user, offerDetail: state.offerDetail, taskDetail: state.taskDetail }), { checkUser, reloadTaskDetail })(withRouter(BlurBackgroundHoc(MakeAnOffer)));