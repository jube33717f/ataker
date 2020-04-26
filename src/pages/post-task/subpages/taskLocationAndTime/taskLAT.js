import TaskLocationAndTime from "./taskLocationAndTime"
import React, { Component } from "react";
import { GoogleApiWrapper ,} from 'google-maps-react';
class TaskLAT extends Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props)
        return(<>
        <TaskLocationAndTime  {...this.props} google={this.props.google}/>
            </>)
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDy7fG8VcN_upR7UZ7lC63h7cVbVwYu558',
    libraries: ["places",'geocoding']
  })(TaskLAT)