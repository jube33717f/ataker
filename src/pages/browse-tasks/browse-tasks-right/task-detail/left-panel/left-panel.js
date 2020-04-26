import React from "react";
import { Link } from "react-router-dom"
import ToggleTextbox from "../../../../../components/toggle-textbox/toggle-textbox";
import { get_time_diff } from "../../../../../utils/time-difference";
import LocationIcon from "../../../../../assets/locationIcon.png";
import CalendarIcon from "../../../../../assets/calendarIcon.png";
import formatDate from "../../../../../utils/date-formatter";

import { connect } from "react-redux"
// TODO @SONIA
const { BASE } = global.constants;

class LeftPanel extends React.Component {
    constructor() {
        super();
    }
    render() {
        const { taskData, userRole } = this.props.taskDetail;
        const { title, posterInfo, postDate, place, dueDate, status, detail } = taskData && taskData.taskDetail;
        const photo = posterInfo && posterInfo.photo && `${BASE}/upload/${posterInfo.photo.filename}`

        return <div className="task-detail__left-panel">
            <div className="task-status">
                <span className="current-status">
                    <span>Open</span>
                </span>
                <span className={status === "assigned" || status === "assigned-topay" || status === "completed" || status === "reviewed" ? "current-status" : "other-status"}>
                    <span>Assigned</span>
                </span>
                <span className={status === "completed" || status === "reviewed" ? "current-status" : "other-status"}>
                    <span>Completed </span>
                </span>
                {
                    userRole
                    &&
                    <span className={status === "reviewed" ? "current-status" : "other-status"}>
                        <span>Reviewed </span>
                    </span>
                }
            </div>
            <h2> {title}</h2>
            <div className="poster-detail">
                <div className="poster-detail__item">
                    <div className="avatar-image">
                        <img src={photo} alt="" />
                    </div>
                    <div className="poster-detail__item--detail">
                        <div className="bold small-title">Posted by</div>
                        <div className="user-name-holder">
                            <Link to="" className="user-name">
                                {posterInfo ? posterInfo.username : ''}
                            </Link>
                        </div>
                        <span className="right-info">{get_time_diff(postDate)} ago</span>
                    </div>
                </div>
                <div className="poster-detail__item">
                    <div className="avatar-image">
                        <img src={LocationIcon} alt="" />
                    </div>
                    <div className="poster-detail__item--detail">
                        <div className="bold small-title">Location</div>
                        <div>{place}</div>
                        <span className="right-info"><Link to="" className="user-name">View Map</Link></span>

                    </div>
                </div>
                <div className="poster-detail__item">
                    <div className="avatar-image">
                        <img src={CalendarIcon} alt="" />
                    </div>
                    <div className="poster-detail__item--detail">
                        <div className="bold small-title">Due Date</div>
                        <div>{formatDate(dueDate)}</div>
                    </div>
                </div>

            </div>

            <div className="splitter-section-name">Details</div>
            <ToggleTextbox detail={detail} />
        </div>;
    }
}
export default connect(state => ({ user: state.user, taskDetail: state.taskDetail }), {})(LeftPanel)
