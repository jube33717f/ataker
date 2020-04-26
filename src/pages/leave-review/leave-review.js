import React from "react";
import { Link, withRouter } from "react-router-dom";
import BlurBackgroundHoc from "../../hoc/blurBackgroundHoc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { deleteLastSubPath } from "../../utils/path-generator"
import { reloadTaskDetail } from "../../redux/actions"
import { reqUpdateUser, reqUserInfo } from "../../api/api"
import "./leave-review.scss"
import Rating from "../../components/rating/rating"

// TODO @SONIA
const { BASE } = global.constants;

class LeaveReview extends React.Component {
    constructor() {
        super();
        this.state = {
            rating: 5
        }
    }


    componentDidMount() {
        this.props.blurBackground();
    }

    componentWillUnmount() {
        this.props.resetBackground();
    }

    sendReview = async () => {
        const { pathname } = this.props.location;

        try {
            const userResult = await reqUserInfo(this.props.user.email);
            const updateUserResult = await reqUpdateUser(this.props.user.email, { rating: this.state.rating + userResult.rating / 2 }); ////这里后台数据结构要改
            if (updateUserResult.status === 200) {
                this.props.reloadTaskDetail(true);
                this.props.history.push(deleteLastSubPath(pathname))
            }
        } catch (e) {
            alert('Failed to post a review')
        }
    }


    render() {
        const { pathname } = this.props.location;
        return (
            <div className="container">
                <div className="container--not-blured">
                    <div className="leave-review-form">
                        <div className="form__header">
                            <div>
                                Review
                                    <FontAwesomeIcon icon={faWindowClose} className="button-close"
                                    onClick={() => {
                                        this.props.history.push(deleteLastSubPath(pathname))
                                    }} />
                            </div>
                        </div>

                        <div className="auth-form__content">

                            <Rating onClick={(e) => this.setState({ rating: e.target.value })} />
                        </div>

                        <div className="bottom-buttons">
                            <button
                                onClick={this.sendReply}>
                                Send
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default connect(state => ({ user: state.user }), { reloadTaskDetail })(
    BlurBackgroundHoc(withRouter(LeaveReview))
);
