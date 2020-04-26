import React, { Component } from "react";
// TODO @SONIA

export default (WrappedComponent) => {
  class BlurBackgroundHoc extends Component {
    constructor(props) {
      super(props);
    }

    blurBackground = () => {
      document.body.style.overflow = "hidden";
      document
        .querySelectorAll("#root>*:not(.container), .container>*:not(.container--not-blured)")
        .forEach(e => {
          e.style.filter = "blur(3px)";
          e.style.pointerEvents = "none";
        });
    };

    resetBackground = () => {
      document.body.style.overflow = "";
      document
        .querySelectorAll("#root>*:not(.container), .container>*:not(.container--not-blured)")
        .forEach(e => {
          e.style.filter = "";
          e.style.pointerEvents = "";
        });
    };

    render() {
      const hocProps = { blurBackground: this.blurBackground, resetBackground: this.resetBackground }

      return (<WrappedComponent {...hocProps} {...this.props} />);
    }
  }
  return BlurBackgroundHoc;
}

// export default withRouter(PopUpFormHoc);
