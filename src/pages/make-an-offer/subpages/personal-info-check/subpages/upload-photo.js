import React, { Component } from "react";
import { connect } from "react-redux";
import "./upload-photo.scss"
import { reqUploadAvatar } from "../../../../../api/api";
// TODO @SONIA
const { BASE } = global.constants;

class UploadPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: this.props.userData ? `${BASE}/upload/${this.props.userData.filename}` : undefined
        }
    }


    uploadPhoto = async (e) => {
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        try {
            const result = await reqUploadAvatar(this.props.user.email, formData); //这里的formData始终返回的是prototype?
            if (result && result.status === 200) {
                this.setState({ photo: `${BASE}/upload/${result.data.filename}` })
                alert(`succeed to upload photo! `);
            }
        } catch (error) {
            alert(error)
        }
    }

    render() {
        const { photo } = this.state;
        return (
            <div>
                <img src={photo} className="upload-photo" />
                <button className="green-button upload-button">
                    <input type="file" className="upload-button__input" onChange={this.uploadPhoto} />
                    Upload
                    </button>
            </div>
        );
    }
}
export default connect(state => ({ user: state.user }), {})(UploadPhoto);