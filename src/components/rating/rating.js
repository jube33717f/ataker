import React, { Component } from "react";

import "./rating.scss";
// TODO @SONIA

export default class Rating extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div class="rating" >
                <input type="radio" name="star" id="starFirst" onClick={this.props.setRating} value={1} /><label for="starFirst"></label>
                <input type="radio" name="star" id="starSecond" onClick={this.props.setRating} value={2} /><label for="starSecond"></label>
                <input type="radio" name="star" id="starThird" onClick={this.props.setRating} value={3} /><label for="starThird"></label>
                <input type="radio" name="star" id="starFourth" onClick={this.props.setRating} value={4} /><label for="starFourth"></label>
                <input type="radio" name="star" id="starFifth" onClick={this.props.setRating} value={5} /><label for="starFifth"></label>
            </div>
        );
    }
}