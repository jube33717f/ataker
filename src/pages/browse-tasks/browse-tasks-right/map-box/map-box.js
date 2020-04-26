import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker, Geocoder } from 'google-maps-react';
import CurrentLocation from './map';
import markerIcon from "../../../../assets/markerIcon.png";
import "./map-box.scss";
import dateFormatter from "../../../../utils/date-formatter"
import { connect } from 'react-redux';
import { reqTaskList } from "../../../../api/api";
import { changeDistance, changePrice, changeLocation } from '../../redux/actions'
import { withRouter } from "react-router-dom";
// TODO @JUbi
// const mapStyles = {
//   map: {

//     width: '80%',
//     height: '100%'
//   }
// };
// const infoStyles = {
//   info:{
//     // margin:0 auto,

//     opacity:'0.85'
//   }
// } 
const { BASE } = global.constants;
export class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [false, false, false],
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker
      changed: false,
      zoom: '',
      newsNum: '',
    };
  }
  //   async componentDidMount() {
  //   console.log(this.props.)
  // try {
  //   const result = await reqTaskList();
  //   if (result.status === 200) {
  //     this.props.addTaskList(result.data.taskList);
  //     this.setState({ newsNum: result.data.taskList.length });
  //   }
  // } catch (error) {
  //   alert("failed to request task list");
  // }
  //   }
  async componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps)
    if (prevProps.taskList.listData !== this.props.taskList.listData) {
      this.forceUpdate();
    }
    if (prevProps.locations !== this.props.locations) {
      console.log("changed")
      this.forceUpdate();
    }
    if (prevProps.distance !== this.props.distance) {//calculate zoom 
      console.log('distance', this.props.distance)
      let l = document.querySelector('.mapbox').clientWidth;//px
      console.log(l)
      let dipx;
      if (window.screen.deviceXDPI) {
        dipx = window.screen.deviceXDPI;
      } else {
        dipx = 100;
      }

      console.log(dipx)
      //l=l*25.4/dipx/1000//m
      //console.log(l)
      let scale = this.props.distance * 1000 / (l * 25.4 / dipx / 1000);
      console.log(scale)
      if (scale > 591657550.5) {
        this.setState({ zoom: 1 });
      } else if (scale > 295828775.3) {
        this.setState({ zoom: 2 });
      } else if (scale > 147914387.6) {
        this.setState({ zoom: 3 });
      } else if (scale > 73957193.82) {
        this.setState({ zoom: 4 });
      } else if (scale > 36978596.91) {
        this.setState({ zoom: 5 });
      } else if (scale > 18489298.45) {
        this.setState({ zoom: 6 });
      } else if (scale > 9244649.227) {
        this.setState({ zoom: 7 });
      } else if (scale > 4622324.614) {
        this.setState({ zoom: 8 });
      } else if (scale > 2311162.307) {
        this.setState({ zoom: 9 });
      } else if (scale > 1155581.153) {
        this.setState({ zoom: 10 });
      } else if (scale > 577790.5767) {
        this.setState({ zoom: 11 });
      } else if (scale > 288895.2884) {
        this.setState({ zoom: 12 });
      } else if (scale > 144447.6442) {
        this.setState({ zoom: 13 });
        console.log(this.state.zoom)
      } else if (scale > 72223.8220) {
        this.setState({ zoom: 14 });
      } else if (scale > 36111.9110) {
        this.setState({ zoom: 15 });
      } else if (scale > 18055.95552) {
        this.setState({ zoom: 16 });
      } else if (scale > 9027.977761) {
        this.setState({ zoom: 17 });
      } else if (scale > 4513.988880) {
        this.setState({ zoom: 18 });
      } else if (scale > 2256.994440) {
        this.setState({ zoom: 19 });
      } else if (scale > 1128.497220) {
        this.setState({ zoom: 20 });
      }


    }

  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  generatePath(item) {
    return `${item.title.replace(
      / /g,
      "-"
    )}-${item._id}`;
  }


  render() {
    // const infoStyle = Object.assign({}, infoStyles.info);
    //const {location}=this.props;

    console.log(this.props.taskList.listData[0])

    return (
      <div className="mapbox">
        <CurrentLocation

          centerAroundCurrentLocation
          google={this.props.google}
          {...this.props}
          {...this.state}

        >
          {/* <Marker  address={this.props.locations} name={'current location'} /> */}

          {this.props.locations === '' ? <Marker name={'current location'} /> : <Marker position={this.props.locations} name={'current location'} />}
          {/* {this.props.taskList.listData.sort((a, b) => Date.parse(b.postDate) - Date.parse(a.postDate)).map((item, index) =>()} */}

          {this.props.taskList.listData.map((item, index) => (
            <Marker
              //   {...this.props}
              //place_id={this.props.locations}
              position={item.place_coordinate}
              onClick={this.onMarkerClick}
              name={item.title}
              time={dateFormatter(item.postDate)}
              poster={item.posterName}
              price={item.price}
              profilephoto={'https://pbs.twimg.com/profile_images/1036730403514736650/PCRxFiEt_400x400.jpg'}
              icon={markerIcon}
            />

          ))}
          {this.props.taskList.listData.map((item, index) => (

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >

              <div className="mapbox--infoWindow">
                <div className="mapbox--infoWindow--top">
                  <div className="mapbox--infoWindow--top__img">
                    <img src={this.state.selectedPlace.profilephoto} />
                  </div>
                  <div className="mapbox--infoWindow--top__earn">
                    <span>${this.state.selectedPlace.price}</span>
                  </div>
                </div>
                <div className="mapbox--infoWindow--bottom">
                  <h4>{this.state.selectedPlace.name}</h4>
                  <p>Posted on {this.state.selectedPlace.time}</p>
                  <span>Posted by {this.state.selectedPlace.poster}</span>
                  <button onClick={() => {
                    this.props.history.push(
                      `${this.props.match.path}/${this.generatePath(item)}`
                    );
                  }}>View Task</button>
                </div>
              </div>
            </InfoWindow>
          ))}


          {/* 
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            
            <div  className="mapbox--infoWindow">
              <div className="mapbox--infoWindow--top">
                <div className="mapbox--infoWindow--top__img">
                  <img src={this.state.selectedPlace.profilephoto}/>
                </div>
                <div className="mapbox--infoWindow--top__earn">
                <span>{this.state.selectedPlace.price}</span>
                </div>
              </div>
              <div className="mapbox--infoWindow--bottom">
                <h4>{this.state.selectedPlace.name}</h4>
                <p>{this.state.selectedPlace.time}</p>
                <span>{this.state.selectedPlace.poster}</span>
                <button>View Task</button>
              </div>
            </div>
          </InfoWindow> */}

          {/* <Marker
              position={{ lat: -33.900128, lng:  151.224562 }}
              onClick={this.onMarkerClick}
              name={'Wall mount 65 inch TV'} 
              price={'$50'}
              time={'Due in 6 hours'}
              poster={'post by Purushi,21 hours ago'}
              profilephoto={'https://pbs.twimg.com/media/Dyg-PPzXcAAY5Wv?format=jpg&name=small'}
              icon={markerIcon}
          /> */}
          {/* <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            
            <div  className="mapbox--infoWindow">
              <div className="mapbox--infoWindow--top">
                <div className="mapbox--infoWindow--top__img">
                  <img src={this.state.selectedPlace.profilephoto}/>
                </div>
                <div className="mapbox--infoWindow--top__earn">
                <span>{this.state.selectedPlace.price}</span>
                </div>
              </div>
              <div className="mapbox--infoWindow--bottom">
                <h4>{this.state.selectedPlace.name}</h4>
                <p>{this.state.selectedPlace.time}</p>
                <span>{this.state.selectedPlace.poster}</span>
                <button>View Task</button>
              </div>
            </div>
          </InfoWindow> */}
          {/* 
          <Marker
            className="mapbox__maker"
            //address={[{long_name:"Kensington",short_name:"Kensington"},{long_name:"Randwick City Council",short_name:"Randwick"},{long_name:"New South Wales",short_name:"NSW"},{long_name:"Australia",short_name:"AU"},{long_name:"2033",short_name:"2033"}]}
            position={{ lat: -33.912605, lng: 151.235999 }}
            onClick={this.onMarkerClick}
            name={'Tree looper with tree mulcher'}
            price={'$140'}
            time={'Due 12 hours ago'}
            poster={'post by papa H,21 hours ago'}
            profilephoto={'https://pbs.twimg.com/media/Dyg6-4xWoAEUNut?format=jpg&name=small'}
            icon={markerIcon}
          />
          <InfoWindow

            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div className="mapbox--infoWindow">
              <div className="mapbox--infoWindow--top">
                <div className="mapbox--infoWindow--top__img">
                  <img src={this.state.selectedPlace.profilephoto} />
                </div>
                <div className="mapbox--infoWindow--top__earn"><p>EARN</p><span>{this.state.selectedPlace.price}2</span></div>
              </div>
              <div className="mapbox--infoWindow--bottom">
                <h4>{this.state.selectedPlace.name}</h4>
                <p>{this.state.selectedPlace.time}</p>
                <span>{this.state.selectedPlace.poster}</span>
                <button>View Task</button>
              </div>
            </div>
          </InfoWindow> */}
        </CurrentLocation>


      </div>
    );
  }
}

// GoogleApiWrapper({
//   apiKey: 'AIzaSyDy7fG8VcN_upR7UZ7lC63h7cVbVwYu558'
// })(MapBox);

function mapStateToProps(state) {
  return {
    locations: state.locations.locations,
    distance: state.distance.distance,
    price: state.price.price,
    taskList: state.taskList
  }
}

GoogleApiWrapper({
  apiKey: 'AIzaSyDy7fG8VcN_upR7UZ7lC63h7cVbVwYu558'
})(MapBox);
export default connect(mapStateToProps, {
  changeDistance, changePrice, changeLocation
})(withRouter(MapBox));

// export default 