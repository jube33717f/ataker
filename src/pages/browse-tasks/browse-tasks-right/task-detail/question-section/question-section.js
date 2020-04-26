import React from "react";
import { Link, withRouter } from "react-router-dom";
import ToggleTextbox from "../../../../../components/toggle-textbox/toggle-textbox";
import TextEditor from "../../../../../components/text-editor/text-editor"
import { get_time_diff } from "../../../../../utils/time-difference";
import { connect } from "react-redux"
import { reqPostQuestion } from "../../../../../api/api"
import { reloadTaskDetail } from "../../../../../redux/actions"
// TODO @SONIA
const { BASE } = global.constants;

class QuestionBoxSection extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({ message: '' })
        }
    }

    sendQuestion = async () => {
        try {
            const messageData = {
                targetId: this.props.match.params.id,
                content: this.state.message
            }
            const result = await reqPostQuestion(this.props.user.email, messageData);
            if (result.status === 200) {
                this.props.reloadTaskDetail(true);
            }
        } catch (e) {
            alert('Failed to post question')
        }
    }

    pushToGeneratedUrl = (pathname, data) => {
        this.props.history.push(`${this.props.match.url}/${pathname}-question-${data.questionId}`);

    }


    render() {
        const { pathname } = this.props.location;
        const userEmail = this.props.user.email;
        const { questions } = this.props.taskDetail.taskData;
        const posterName = this.props.taskDetail.taskData.taskDetail && this.props.taskDetail.taskData.taskDetail.posterInfo.username;

        return (
            <div className="task-detail__question">
                <div className="splitter-section-name">
                    Questions({
                        questions && questions.length !== 0 ? questions.length : 0  //  + questions.reduce((accum, current) => accum + current.replies.length,0)
                    })
                </div>
                <div className="small-title bold">
                    Please don't share personal info – insurance won't apply to tasks not done through Airtasker!
                </div>

                {userEmail
                    ?
                    <TextEditor
                        targetPerson={posterName}
                        onChange={(e) => this.setState({ message: e.target.value })}
                        value={this.state.message}
                        onSubmit={() => { this.sendQuestion(); this.setState({ message: '' }) }}
                    />
                    :
                    <div className="padder">
                        <h4>To join the conversation</h4>
                        <Link className="green-button" to={`${pathname}/signup`}>
                            Sign Up
                        </Link>
                        or
                        <Link className="green-button" to={`${pathname}/login`}>
                            Log In
                        </Link>
                    </div>
                }

                {questions && questions.map((question, index) => (
                    <>
                        <ToggleTextbox message={question} key={index} questionId={question._id} />
                        {question.replies.map((message, index) => (
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
                                        {userEmail && <Link onClick={() => this.pushToGeneratedUrl('reply', { questionId: question._id })}>Reply</Link>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ))
                }
            </div>
        );
    }
}
export default connect(state => ({ user: state.user, taskDetail: state.taskDetail }), { reloadTaskDetail })(withRouter(QuestionBoxSection))
