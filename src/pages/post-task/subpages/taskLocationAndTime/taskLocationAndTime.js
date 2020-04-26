import React, { Component } from "react";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import InputComponent from "../../../../hoc/inputComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ValidationHoc from "../../../../hoc/validationHoc";
import { connect } from "react-redux";
import { addTask, setValidationHocCheck } from "../../../../redux/actions"
import { withRouter } from "react-router-dom";
import { GoogleApiWrapper ,} from 'google-maps-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import InputAuto from "../../../browse-tasks/task-menu/auto-complete"
// TODO @SONIA
class TaskLocationAndTime extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.props.addTask(this.props.values)
        }
    }

    async componentDidMount() {
        const { taskLocation, taskDuedate } = this.props.postTask.taskData;
        this.props.setHocData({ taskLocation, taskDuedate })
        this.props.setValidationHocCheck(this.props.okToSubmit);

        // 如果是post a similar task，需要提前加载好数据
        const taskId = this.props.match.params.id
        if (taskId && !this.props.postTask.taskData.taskLocation && this.props.taskDetail.taskData) {
            const { dueDate, place } = this.props.taskDetail.taskData.taskDetail;
            const taskData = { taskLocation: place, taskDuedate: dueDate };
            this.props.setHocData(taskData);
        }
    }

    render() {
        return (
            <div className={`form__content ${this.props.pageMovementDirection}`}>
                <div className="form__content--item">

                    <label htmlFor="taskLocation">Where do you need it done?</label>

                    <div className="tab-container">

                        <div className="tab-option" >

                            <div className="tab-option--header">
                                <InputComponent {...this.props} name="taskLocation"
                                    inputClassName="input-option" errorClassName="input-option--hide"
                                    value="" type="radio" />
                                <div className={this.props.values.taskLocation !== "online" ? "input-option--dot" : ''}></div>
                                In person
                            </div>
                            <p>Select this if you need the Tasker physically there.</p>
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </div>

                        <div className="tab-option" >
                            <div className="tab-option--header">
                                {/* <InputAuto /> */}
                                <InputComponent {...this.props}
                                    name="taskLocation" value="online" type="radio"
                                    inputClassName="input-option" errorClassName="input-option--hide" />
                                <div className={this.props.values.taskLocation === "online" ? "input-option--dot" : ''}></div>
                                Online
                            </div>
                            <p>Select this if the Tasker can do it from home.</p>
                            <FontAwesomeIcon icon={faDesktop} />
                        </div>

                    </div>

                    {this.props.values.taskLocation !== "online"
                        &&
                        // @JUBI

                        <GooglePlacesAutocomplete
                            placeholder="Enter a surburb"
                            onSelect={(e) => {
                                console.log(e)
                                const google = this.props.google;
                                const maps = google.maps;
                                let geocoder=new maps.Geocoder;
                                if(e.place_id!=''){
                                    geocoder.geocode({'placeId': e.place_id}, (results, status) => {
                                        if (status === 'OK') {
                                            console.log(results[0].geometry.location)
                                            
                                            this.props.setHocData({taskLocation: e.description, taskLocationCoordinate: results[0].geometry.location});
                                            //changeLocation({locations:results[0].geometry.location});
                                            //results[0].geometry.location=>redux
                                        }
                                    })
                                }
                                
                                
                                // this.setState({place:e.place_id});
                            }}
                       />
                        // <InputComponent {...this.props} name="taskLocation" inputClassName="input-area" />

                    

                    }

                </div>

                <div className="form__content--item">
                    <InputComponent {...this.props}
                        title="When do you need it done?" name="taskDuedate" type="date"
                        inputClassName="input-area" />
                </div>
            </div>
        );
    }
}
GoogleApiWrapper({
    apiKey: 'AIzaSyDy7fG8VcN_upR7UZ7lC63h7cVbVwYu558',
    libraries: ["places",'geocoding']
  })(TaskLocationAndTime);
export default connect(state => ({ postTask: state.postTask, taskDetail: state.taskDetail }), { addTask, setValidationHocCheck })(
    ValidationHoc(withRouter(TaskLocationAndTime), ["taskLocation", "taskDuedate"]))