import React, { Component } from "react";
import "./text-editor.scss"
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
// TODO @SONIA

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.textEditorRef = React.createRef();
    this.textAreaRef = React.createRef();
    this.state = {
      characterCount: this.props.value ? this.props.value.length : 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({ characterCount: 0 })
    }
  }



  render() {
    return (
      <div className="text-editor" ref={this.textEditorRef}>
        <textarea
          ref={this.textAreaRef}
          placeholder={this.props.targetPerson ? `Ask ${this.props.targetPerson} a question` : ''}
          onFocus={() => { this.textEditorRef.current.style.border = "1px solid #008fb4" }}
          onBlur={() => { this.textEditorRef.current.style.border = ""; }}
          onChange={(e) => {
            if (typeof this.props.onChange === "function") { this.props.onChange(e); }
            this.setState({ characterCount: e.target.value.length })
            // TODO: 自动延长输入框
            // if (Number(this.textAreaRef.current.scrollHeight) > 54) {
            //   console.log(this.textAreaRef.current.style.height, this.textAreaRef.current.scrollHeight)
            //   this.textAreaRef.current.style.height = Number(this.textAreaRef.current.scrollHeight) + 'px';
            // }
          }
          }
          value={this.props.value}
        />

        <button>
          <FontAwesomeIcon icon={faPaperclip} />
        </button>

        <div className="text-editor--right" >
          <span>{this.state.characterCount}</span>
          {!this.props.disableSendButton && <button onClick={() => {
            this.props.onSubmit();
            this.setState({ characterCount: 0 })
          }}>Send</button>}
        </div>
      </div>
    )
  }
}

export default withRouter(TextEditor);
