import React, { Component } from "react";
import { connect } from "react-redux";
import { addOfferDetail } from "../../../redux/actions"
import "./price-statement.scss"
// TODO @SONIA

class PriceStatement extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="price-statement">
                <div className="price-statement__form">
                    <h3>Your offer</h3>
                    <div>
                        $
                        <input
                            className="input-area"
                            onChange={(e) => {
                                this.props.addOfferDetail({ price: e.target.value })
                            }}
                            value={this.props.offerDetail.offerData.price}
                            type="number"
                        />
                    </div>
                    <div className="price-statement__form--summary">
                        <div className="price-calculator">
                            <span>You will recieve ...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(state => ({ offerDetail: state.offerDetail }), { addOfferDetail })(PriceStatement);

