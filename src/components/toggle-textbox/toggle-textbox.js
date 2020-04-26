import React, { Component } from "react";
import "./toggle-textbox.scss";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { get_time_diff } from "../../utils/time-difference"
import OfferMsgComponent from "./offerMsgComponent"
// TODO @SONIA

class ToggleTextbox extends Component {
  constructor(props) {
    super(props);
    this.state = { message: {}, detail: "", toggle: true, overflow: false };
    this.messageRef = React.createRef();
  }
  componentDidMount() {
    this.messageRef.current.style.maxHeight = "120px";
    this.setState(this.props);
  }
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState(this.props);
      this.messageRef.current.style.maxHeight = "120px"; //一定要加上这一行，不然maxheight是之前mount的元素的？
      this.setState({ overflow: false, toggle: true });
    }
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      if (Number(this.messageRef.current.scrollHeight) > Number(this.messageRef.current.style.maxHeight.substr(0, this.messageRef.current.style.maxHeight.length - 2))) {
        this.setState({ overflow: true })
      }
    }
  }

  pushToGeneratedUrl = (pathname, data) => {
    // 不知为什么这里不能通过location.state传递参数
    // this.props.history.push(`${this.props.match.url}/${pathname}`, { data });

    if (data.offerId) {
      this.props.history.push(`${this.props.match.url}/${pathname}-offer-${data.offerId}`);
    } else if (data.questionId) {
      this.props.history.push(`${this.props.match.url}/${pathname}-question-${data.questionId}`);
    }
  }


  render() {
    const { message, toggle, detail, overflow } = this.state;

    return (<div>
      <div className="toggle-textbox">
        <div ref={this.messageRef} className={`toggle-textbox__message ${(toggle && overflow) && 'toggle-textbox__message--blur'}`} >
          {Object.keys(message).length !== 0
            ?
            <OfferMsgComponent message={message} />
            :
            detail}

          {(!toggle || overflow)
            &&
            <button onClick={() => {
              if (toggle) {
                if (Number(this.messageRef.current.scrollHeight) > Number(this.messageRef.current.style.maxHeight.substr(0, this.messageRef.current.style.maxHeight.length - 2))) {
                  this.messageRef.current.style.maxHeight = this.messageRef.current.scrollHeight + 'px';
                }
              } else {
                this.messageRef.current.style.maxHeight = "120px";
              }
              this.setState({ toggle: !toggle });
            }}>
              {toggle ? 'More' : 'Less'}
              <FontAwesomeIcon icon={faChevronDown} className="arrow-icon" style={{ transform: toggle ? '' : 'rotate(180deg)' }} />
            </button>
          }
        </div>

      </div>
      <div style={{ marginTop: (!toggle || overflow) ? '22px' : '' }}>
        {Object.keys(message).length !== 0
          &&
          <div className="toggle-textbox__message--bottom"><span>{get_time_diff(message.postDate)} ago</span>
            {this.props.user.email && <Link onClick={() => { this.pushToGeneratedUrl('reply', { offerId: this.props.offerId, questionId: this.props.questionId }); }}>Reply</Link>}

          </div>
        }
      </div>
    </div>
    );
  }
}
export default connect(state => ({ user: state.user }), { login })(
  withRouter(ToggleTextbox)
);
