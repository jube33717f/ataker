import React from "react";
import { withRouter, Link } from "react-router-dom";
import ToggleTextbox from "../../../../../components/toggle-textbox/toggle-textbox";
import JobOffer from "../../../../../assets/job-offer.svg";
import { get_time_diff } from "../../../../../utils/time-difference";
import { reqUpdateTask, reqTaskDetail } from "../../../../../api/api";
import { connect } from "react-redux";
import { addTaskDetail, reloadTaskList } from "../../../../../redux/actions"
const { BASE } = global.constants;
// TODO @SONIA

class OfferSection extends React.Component {
    constructor() {
        super();
    }

    acceptOffer = async (offer) => {
        const taskId = this.props.match.params.id;
        try {
            const result = await reqUpdateTask(taskId, { status: 'assigned', offers: [offer._id] }); //accept offer时改变task.status，并在task.offers里删除除assignee之外的所有offer
            const taskDetailResult = await reqTaskDetail(taskId); //accept offer时改变task.status，并在task.offers里删除除assignee之外的所有offer

            this.props.addTaskDetail(taskDetailResult.data)

            if (result.status === 200) {
                const { taskDetail } = this.props;
                // taskDetail.offers = [offer];
                taskDetail.taskData.taskDetail.status = "assigned";
                // this.props.addTaskDetail(taskDetail);
                this.props.reloadTaskList(true);
            }
        } catch (error) {
            alert("failed to accept offer");///
        }
    }

    pushToGeneratedUrl = (pathname, data) => {

        if (pathname === 'reply') {
            this.props.history.push(`${this.props.match.url}/${pathname}-offer-${data.offerId}`);

        } else {
            this.props.history.push(
                `${this.props.match.url}/${pathname}/${this.props.match.params[0]}-${this.props.match.params.id}`
            );
        }
    }

    render() {
        const userEmail = this.props.user.email;
        const { taskData, userRole } = this.props.taskDetail;
        const { offers } = taskData;
        const { status } = taskData ? taskData.taskDetail : '';

        return (<div className="task-detail__offer">
            <div className="splitter-section-name">
                {status === 'open' ? 'Offers' : 'Assignee'}
            </div>
            {/* 这里默认如果assign task后，offers里面就只有assignee的offer */}
            {offers && offers.length !== 0
                ?
                offers.map((offer) =>
                    offer.messages.map((message, index) =>
                        index === 0
                            ?
                            <div className="task-detail__offer--offerer">
                                <ToggleTextbox message={message} offerId={offer._id} />
                                {userRole === "poster" && <>
                                    <h3>
                                        ${offer.price}
                                    </h3>
                                    <div className={`green-button ${status !== "open" && 'button--disabled'} `} onClick={() => { this.acceptOffer(offer) }}>
                                        {status === "open" ? 'Accept' : 'Accepted'}
                                    </div></>}
                            </div>
                            :
                            <div className="task-detail__offer--reply">
                                <div className="avatar-image">
                                    <img src={message.senderInfo.photo && `${BASE}/upload/${message.senderInfo.photo.filename}`} alt="" />
                                </div>
                                <div className="poster-detail__item--detail">
                                    <div className="user-name-holder">
                                        <Link to="" className="user-name">
                                            {message.senderInfo.username}
                                        </Link>
                                    </div>
                                    {message.content}

                                    <div className="toggle-textbox__message--bottom"><span>{get_time_diff(message.postDate)} ago</span>
                                        {userEmail && <Link onClick={() => this.pushToGeneratedUrl('reply', { offerId: offer._id })}>Reply</Link>}
                                    </div>
                                </div>
                            </div>
                    )
                )
                :
                <div className="task-detail__offer--no-offer">
                    <img src={JobOffer} ></img>
                    <div className="green-button" onClick={() => {
                        //如果没登陆的话自动跳转登陆
                        if (!userEmail) {
                            this.props.history.push(`${this.props.match.url}/login`);
                        } else if (this.props.user.userRole !== "poster") {
                            this.pushToGeneratedUrl('make-an-offer')
                        }
                    }}>{this.props.taskDetail.userRole === "poster" ? 'No offer yet' : 'Make an offer'} </div>
                </div>
            }
        </div>
        );
    }
}
export default connect(state => ({ user: state.user, taskDetail: state.taskDetail }), { addTaskDetail, reloadTaskList })(withRouter(OfferSection));