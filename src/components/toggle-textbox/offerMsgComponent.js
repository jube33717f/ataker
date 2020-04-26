import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
const { BASE } = global.constants;

export default function OfferMsgComponent(props) {
    const { message } = props;
    const photo = message.senderInfo.photo && `${BASE}/upload/${message.senderInfo.photo.filename}`

    return (
        <>
            <div className="poster-detail__item">
                <div className="avatar-image">
                    <img src={photo} alt="" />
                </div>
                <div className="poster-detail__item--detail">
                    <div className="user-name-holder">
                        <Link to="" className="user-name">
                            {message.senderInfo.username}
                        </Link>
                    </div>
                    <div className="bold small-title">{message.senderInfo.rating} rating</div>
                    <div className="bold small-title"> {message.senderInfo.completionRate * 100 + "%"} Completion rate</div>
                </div>
            </div>
            <div className="toggle-textbox__message--content">{message.content}</div>
        </>
    )
}