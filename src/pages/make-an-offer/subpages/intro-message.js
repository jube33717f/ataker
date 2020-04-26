import React, { Component } from "react";
import { connect } from "react-redux";
import "./intro-message.scss"
import { addOfferDetail } from "../../../redux/actions"
import TextEditor from "../../../components/text-editor/text-editor"
// TODO @SONIA

class IntroMessage extends React.Component {
    constructor() {
        super();

    }


    render() {
        return (
            <div className="">
                <p>Why are you the best person for this task?</p>
                <TextEditor
                    onChange={e => { this.props.addOfferDetail({ message: e.target.value }) }}
                    value={this.props.offerDetail.offerData.message}
                    disableSendButton={true} />
            </div>
        );
    }
}
export default connect(state => ({ offerDetail: state.offerDetail }), { addOfferDetail })(IntroMessage);

