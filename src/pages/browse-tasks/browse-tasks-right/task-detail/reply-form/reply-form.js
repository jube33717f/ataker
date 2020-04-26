import React from "react";
import { Link, withRouter } from "react-router-dom";
import TextEditor from "../../../../../components/text-editor/text-editor"
import BlurBackgroundHoc from "../../../../../hoc/blurBackgroundHoc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { deleteLastSubPath } from "../../../../../utils/path-generator"
import { reloadTaskDetail } from "../../../../../redux/actions"
import "./reply-form.scss"

import { reqReplyQuestion, reqPostOfferMessage } from "../../../../../api/api"

// TODO @SONIA
const { BASE } = global.constants;

class ReplyForm extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ''
        }
    }


    componentDidMount() {
        this.props.blurBackground();
    }

    componentWillUnmount() {
        this.props.resetBackground();
    }

    sendReply = async () => {
        const { pathname } = this.props.location;

        try {
            const messageData = {
                content: this.state.message,
            }
            let result;
            if (this.props.location.pathname.includes('reply-offer')) {
                messageData.targetId = this.props.match.params.targetId;

                result = await reqPostOfferMessage(this.props.user.email, messageData);
            } else if (this.props.location.pathname.includes('reply-question')) {
                messageData.repliedQuestionId = this.props.match.params.targetId;
                result = await reqReplyQuestion(this.props.user.email, messageData);
            }

            if (result.status === 200) {
                this.props.reloadTaskDetail(true);
                this.props.history.push(deleteLastSubPath(pathname))
            }
        } catch (e) {
            alert('Failed to post question')
        }
    }


    render() {
        const { pathname } = this.props.location;
        return (
            <div className="container">
                <div className="container--not-blured">
                    <div className="reply-form">
                        <div className="form__header">
                            <div>
                                Reply
                                    <FontAwesomeIcon icon={faWindowClose} className="button-close"
                                    onClick={() => {
                                        this.props.history.push(deleteLastSubPath(pathname))
                                    }} />
                            </div>
                        </div>

                        <div className="auth-form__content">
                            <TextEditor
                                onChange={(e) => this.setState({ message: e.target.value })}
                                value={this.state.message}
                                disableSendButton={true}
                            />
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
    BlurBackgroundHoc(withRouter(ReplyForm))
);
