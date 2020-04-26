import React, { Component } from "react";
import Geocode from "react-geocode";
import "./task-menu.scss";
// import InputAuto from './auto-complete'
import AutoComplete from 'react-google-autocomplete'
//import Autocomplete from './autocomplete'
import { GoogleApiWrapper, } from 'google-maps-react';
//import Script from 'react-load-script'
import { connect } from 'react-redux';
import { changeDistance, changePrice, changeLocation, changeInPerson, changeTaskType } from '../redux/actions'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import assigned from "../redux/reducers/tasktype";
class TaskMenu extends Component {
  constructor(props) {
    super(props);
    this.distance = React.createRef();
    this.lowestprice = React.createRef();
    this.highestprice = React.createRef();
    this.state = {
      dropDownBox: false,
      distanceChoicePage: false,
      priceChoicePage: false,
      taskTypeChoicePage: false,
      drag: false,


      place: [],//surburb,distance
      type: false,
      place_description: ''
      //data: []
    };
    this.distanceChoice = this.distanceChoice.bind(this);
    this.priceChoice = this.priceChoice.bind(this);
    this.taskTypeChoice = this.taskTypeChoice.bind(this);
    this.distanceSetP1 = this.distanceSetP1.bind(this);

    this.priceSetP1 = this.priceSetP1.bind(this);
    this.priceSetP2 = this.priceSetP2.bind(this);

    this.placeApply = this.placeApply.bind(this);
    this.placeCancel = this.placeCancel.bind(this);

    this.priceApply = this.priceApply.bind(this);
    this.priceCancel = this.priceCancel.bind(this);

    this.typeApply = this.typeApply.bind(this);
    this.typeCancel = this.typeCancel.bind(this);

    this.trunOnAssOnly = this.trunOnAssOnly.bind(this);
    // this.distanceSetP2 = this.distanceSetP2.bind(this);



  }

  // handleScriptCreate() {
  //   this.setState({ scriptLoaded: false })
  // }

  // handleScriptError() {
  //   this.setState({ scriptError: true })
  // }

  // handleScriptLoad() {
  //   this.setState({ scriptLoaded: true })
  // }



  //Apply&cancel
  placeApply() {
    // const inpVal = this.input.value;
    // console.log(inpVal);

    let surburb = this.state.place;
    if (!surburb) surburb = '';
    const distance_ = this.distance.current.textContent.replace('km', '') - 0;
    const { changeLocation } = this.props;
    const { changeDistance } = this.props;
    console.log("=======Place apply=======");
    changeDistance({ distance: distance_ });
    console.log(this.props.google)
    //const map=new google.maps.Map();

    const google = this.props.google;
    const maps = google.maps;
    let geocoder = new maps.Geocoder;
    if (surburb != '') {
      geocoder.geocode({ 'placeId': surburb }, function (results, status) {
        if (status === 'OK') {
          console.log(results[0].geometry.location)
          changeLocation({ locations: results[0].geometry.location });

          // priceChoicePage
        }
      })
    }
    setTimeout(this.setState({ distanceChoicePage: false }), 3000);





    //const api='https://maps.googleapis.com/maps/api/geocode/json'
    //address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    //Geocode.setApiKey('AIzaSyDy7fG8VcN_upR7UZ7lC63h7cVbVwYu558')
    //Geocode.setRegion("au");
    // surburb='14-18 darling st,kensington,sydney'
    // Geocode.fromPlaceId(surburb).then(
    //     response => {
    //       const { lat, lng } = response.results[0].geometry.location;
    //       console.log(lat, lng);
    //     },
    //     error => {
    //       console.error(error);
    //     }
    //   );
    //changeLocation({locations:surburb});

    console.log(surburb);
    console.log(distance_);
  }
  placeCancel() {
    this.setState({
      distanceChoicePage: false,
    });
  }

  priceApply() {
    const lowestPrice = this.lowestprice.current.textContent;
    const highestPrice = this.highestprice.current.textContent;
    const { changePrice } = this.props;
    console.log("=======Price apply=======");
    changePrice({ price: [lowestPrice, highestPrice] })
    console.log(lowestPrice)
    console.log(highestPrice)
    this.setState({ priceChoicePage: false })
  }
  priceCancel() {
    this.setState({
      priceChoicePage: false,
    });
  }

  typeApply() {
    const type = this.state.type;
    console.log("=======Type apply=======");
    console.log(type);
    changeTaskType({ assigned: type })
    this.setState({ taskTypeChoicePage: false })
  }
  typeCancel() {
    this.setState({ taskTypeChoicePage: false, })
  }


  distanceChoice() {
    if (this.state.distanceChoicePage === false) {
      this.setState({
        priceChoicePage: false,
        taskTypeChoicePage: false,
        distanceChoicePage: true
      });
    } else {
      this.setState({
        distanceChoicePage: false
      });
    }
  }
  priceChoice() {
    if (this.state.priceChoicePage === false) {
      this.setState({
        distanceChoicePage: false,
        taskTypeChoicePage: false,
        priceChoicePage: true
      });
    } else {
      this.setState({
        priceChoicePage: false
      });
    }
  }
  taskTypeChoice() {
    if (this.state.taskTypeChoicePage === false) {
      this.setState({
        priceChoicePage: false,
        distanceChoicePage: false,
        taskTypeChoicePage: true
      });
    } else {
      this.setState({
        taskTypeChoicePage: false
      });
    }
  }


  //distance slider component
  distanceSetP1(event) {
    let e = event || window.event;
    // console.log("1");
    event.preventDefault();

    const bar = document.querySelector(".slider--railing");
    // const len = bar.clientWidth / 20;

    const fill = bar.children[0];
    // document.querySelector('.slider--fill');
    const thumb = bar.children[1];
    const distanceValue = document.querySelector(".menu--flyout--label");
    // document.querySelector('.slider--thumb');
    //const fillL = fill.clientWidth;
    //thum
    let offsetLeft = event.clientX - thumb.offsetLeft;
    // console.log(event.clientX);
    //console.log(fill.clientX);
    // console.log(thumb.offsetLeft);
    // console.log(offsetLeft);
    // const t = this.state.place;
    event.target.onmousemove = function (event) {
      let e = event || window.event;
      let x = e.clientX - offsetLeft;
      // console.log("bar:" + bar.clientWidth);
      //bar.clientWidth+30
      if (x >= 0 && x <= bar.clientWidth - 24) {
        fill.style.width = x + "px";
        thumb.style.left = x + "px";
      }
      let distanceL = parseInt((x / bar.clientWidth) * 100);

      if (distanceL < 0) {
        distanceL = 0;
      }
      if (distanceL > 100) {
        distanceValue.textContent = "100km+";
        // const t = this.state.place;
        // t[1]= distanceL;
        // this.setState({place:t});
      } else {
        distanceValue.textContent = distanceL + "km";
        // const t = this.state.place;
        // t[1]= distanceL;
        // this.setState({place:t});
      }
      // console.log(this.state)
      // t[1] = distanceL;
      // const t = this.state.place
      // console.log(this.props.state)
      // console.log("distance+" + distanceL + 4);
      //return t;




    }

    // console.log(this.state.place)

    event.target.onmouseup = function () {
      // 

      document.onmousemove = null;
    };
  }

  //price slider component
  priceSetP1(event) {
    event.preventDefault();
    let e = event || window.event;
    //console.log("A");

    const bar = document.querySelector(".slider--railing");
    const fillbar = bar.children[0];
    const thumbLeft = bar.children[1];
    const thumbRight = bar.children[2];

    const lowestPrice = document.querySelector(".lowestPrice");

    let offsetLeft = event.clientX - thumbLeft.offsetLeft;

    document.onmousemove = function (event) {
      let e = event || window.event;
      let x = e.clientX - offsetLeft;
      //console.log("bar:"+bar.clientWidth);
      //bar.clientWidth+30
      let priceL = 0;
      if (x >= 0 && x <= bar.clientWidth - 24) {
        fillbar.style.marginLeft = 15 + x + "px";
        let w = thumbRight.offsetLeft;

        if (w - x >= 0) {
          thumbLeft.Enable = true;
          fillbar.style.width = w - x + "px";
          thumbLeft.style.left = x + "px";

          priceL = parseInt((x / bar.clientWidth) * 1000);
        } else {

          thumbLeft.Enable = false;
          fillbar.style.width = 0;
          priceL = parseInt((thumbLeft.offsetLeft / bar.clientWidth) * 1000);
        }

        //thumb.style.left= x+'px';
      }
      //let priceL = parseInt((x / bar.clientWidth) * 10000);

      if (priceL < 0) {
        priceL = 0;
      }
      if (priceL > 1000) {
        lowestPrice.textContent = "999";
      } else {
        lowestPrice.textContent = priceL + "";
      }

      // console.log("lowestPrice+" + priceL);
    };
    document.onmouseup = function () {
      document.onmousemove = null;
    };
  }
  priceSetP2(event) {
    event.preventDefault();
    let e = event || window.event;
    // console.log("B");

    const bar = document.querySelector(".slider--railing");
    const fillbar = bar.children[0];
    const thumbLeft = bar.children[1];
    const thumbRight = bar.children[2];

    const highestPrice = document.querySelector(".highestPrice");

    let offsetLeft = event.clientX - thumbRight.offsetLeft;
    // let offsetRight = thumbRight.offsetLeft + event.clientX -  thumbLeft.offsetLeft;
    // console.log(event.clientX);
    // console.log("thumbLeft"+thumbLeft.offsetLeft);
    // console.log("thumbRight"+thumbRight.offsetLeft);
    // console.log("offsetLeft:" + offsetLeft);

    document.onmousemove = function (event) {
      let e = event || window.event;
      let x = e.clientX - offsetLeft;
      // console.log("bar:" + bar.clientWidth);
      // console.log(e.clientX);
      //bar.clientWidth+30
      let priceL = 0;
      if (x >= 0 && x <= bar.clientWidth - 24 && x - thumbLeft.offsetLeft >= 0) {
        thumbLeft.Enable = true;
        fillbar.style.width = x - thumbLeft.offsetLeft + "px";
        thumbRight.style.left = x + "px";
        priceL = parseInt((x / bar.clientWidth) * 1000);
      } else if (x - thumbLeft.offsetLeft < 0) {
        thumbRight.Enable = false;
        fillbar.style.width = 0;
        priceL = parseInt((thumbRight.offsetLeft / bar.clientWidth) * 1000);
      }

      //let priceL = parseInt((x / bar.clientWidth) * 10000);

      if (priceL < 0) {
        priceL = 0;
      }
      if (priceL > 1000) {
        highestPrice.textContent = "999";
      } else {
        highestPrice.textContent = priceL + "";
      }

      // console.log("highestPrice+" + priceL);
    };
    document.onmouseup = function () {
      document.onmousemove = null;
    };
  }
  inPerson() {
    const slider = document.querySelector(".slider");

    slider.classList.add("slider--enable");
    document.querySelectorAll(".menu--flyout--title")[1].style.color = null;
    document.querySelectorAll(".menu--flyout--title")[2].style.color = null;
    document.querySelector(".menu--flyout--label").textContent = "10km";

    changeInPerson({ inperson: 'in person' });
  }
  remotely() {
    const slider = document.querySelector(".slider");
    slider.classList.remove("slider--enable");
    document.querySelector(".menu--flyout--label").textContent = "";
    document.querySelectorAll(".menu--flyout--title")[1].style.color =
      "#AAADBB";
    document.querySelectorAll(".menu--flyout--title")[2].style.color =
      "#AAADBB";
    changeInPerson({ inperson: 'remotely' });
    // document.querySelector('.menu--flyout--title').style.color=null;
  }
  trunOnAssOnly() {
    const box = document.querySelector(".toggle");
    const button = document.querySelector(".toggle--thumb");
    // console.log(this.state.type)
    box.classList.toggle("toggle--on");
    button.classList.toggle("toggle--thumb--on");

    if (this.state.type) {
      this.setState({ type: false })

    } else {
      this.setState({ type: true })
    }
    // setTimeout(console.log(this.state.type),3000)
  }
  render() {

    return (
      <>
        {/* <Script
              url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDy7fG8VcN_upR7UZ7lC63h7cVbVwYu558&libraries=places"
              onCreate={this.handleScriptCreate.bind(this)}
              onError={this.handleScriptError.bind(this)}
              onLoad={this.handleScriptLoad.bind(this)}/> */}
        <div className="firstly--menu"></div>
        <div className="seconday--menu">
          <div className="seconday--menu--inner">
            <div className="browsetask__menu--scrollable">
              <div className="browseTask__menu--flyoutAnchor">
                <button className="pill" onClick={this.distanceChoice}>
                  <span className="pill__title">
                    {this.props.distance ? this.props.distance : <span>10</span>}km {this.state.place_description !== '' ? this.state.place_description : ''} & remotely
                  </span>
                  <div className="pill__state"></div>
                </button>
                {this.state.distanceChoicePage && (
                  <div className="menu--flyout flyout--location">
                    <div className="menu--flyout--inner menu--flyout--padded">
                      <div className="menu--flyout--title">To be down</div>
                      <div className="option__group">
                        <button
                          className="option__group--button"
                          onClick={this.inPerson}
                        >
                          <span>In person</span>
                        </button>
                        <button
                          className="option__group--button"
                          onClick={this.remotely}
                        >
                          <span>Remotely</span>
                        </button>
                        <button
                          className="option__group--button"
                          onClick={this.inPerson}
                        >
                          <span>All</span>
                        </button>
                      </div>
                      <div className="menu--flyout--title">Centre</div>
                      <div className="location--typehead">

                        {/* <Autocomplete placeholder="Enter a surburb"
                          style={{width: '95%'}}
                          onPlaceSelected={(place1) => {
                              console.log(place1.place_id)
                              console.log(place1.address_components);
                              const surb = place1.address_components;
                              this.setState({place:place1.place_id});
                              console.log('000')
                              console.log(this.state.place);
                          }}
                            types={['(regions)']}
                            // componentRestrictions={{country: "ru"}}
                          /> */}

                        <GooglePlacesAutocomplete
                          placeholder="Enter a surburb"
                          onSelect={(e) => {
                            let des = e.description.split(" ");
                            this.setState({ place_description: des[0] })
                            console.log(e)
                            this.setState({ place: e.place_id });
                          }}
                        />
                      </div>
                      <div className="menu--flyout--title">Distance</div>
                      <div className="menu--flyout--label" ref={this.distance}>10km</div>
                      <div className="slider slider--enable">
                        <div
                          className="slider--railing"
                          onMouseDown={this.distanceSetP1}
                        >
                          <div className="slider--fill"></div>
                          <div className="slider--thumb"></div>
                        </div>
                      </div>
                    </div>
                    <div className="menu--flyout--confirm menu--flyout--confirm--location">
                      <button className="menu--flyout--cancel" onClick={this.placeCancel}>Cancel</button>
                      <button className="menu--flyout--apply" onClick={this.placeApply}>Apply</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="browseTask__menu--flyoutAnchor">
                <button className="pill" onClick={this.priceChoice}>
                  <span className="pill__title">Any price</span>
                  <div className="pill__state"></div>
                </button>
                {this.state.priceChoicePage && (
                  <div className="menu--flyout flyout--price">
                    <div className="menu--flyout--inner menu--flyout--padded">
                      <div className="menu--flyout--title">TASK PRICE</div>
                      <div className="menu--flyout--label">
                        $<span className="lowestPrice" ref={this.lowestprice}>5</span> - $
                        <span className="highestPrice" ref={this.highestprice}>999</span>
                      </div>
                      <div className="slider slider--enable">
                        <div className="slider--railing">
                          <div className="slider--fill fill--middle"></div>

                          <div
                            className="slider--thumb thumb--left"
                            onMouseDown={this.priceSetP1}
                          ></div>
                          <div
                            className="slider--thumb thumb--right"
                            onMouseDown={this.priceSetP2}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="menu--flyout--confirm menu--flyout--confirm--location">
                      <button className="menu--flyout--cancel" onClick={this.priceCancel}>Cancel</button>
                      <button className="menu--flyout--apply" onClick={this.priceApply}>Apply</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="browseTask__menu--flyoutAnchor">
                <button className="pill" onClick={this.taskTypeChoice}>
                  <span className="pill--title">Task type</span>
                  <div className="pill__state"></div>
                </button>
                {this.state.taskTypeChoicePage && (
                  <div className="menu--flyout flyout--type">
                    <div className="menu--flyout--inner menu--flyout--padded">
                      <div className="menu--flyout--title">
                        AVAILABLE TASKS ONLY
                      </div>
                      <span className="menu-flyout--text">
                        Hide tasks that are already assigned
                      </span>
                      <div className="toggle" onClick={this.trunOnAssOnly}>
                        <label>
                          <input className="toggle--input"></input>
                          <span className="toggle--thumb"></span>
                        </label>
                      </div>
                    </div>
                    <div className="menu--flyout--confirm menu--flyout--confirm--location">
                      <button className="menu--flyout--cancel" onClick={this.typeCancel}>Cancel</button>
                      <button className="menu--flyout--apply" onClick={this.typeApply}>Apply</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="browseTask__menu--search">
              <input
                className="search--input"
                placeholder="Search for a task"
              // onChange={}

              ></input>
              <button className="search--input--button">
                {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAB/ElEQVRIib3Vz0uWQRDA8c/bK2XUoS6FlkToC4EeLYgO/b7UoTpEt86FYtT/061TomTXrpEHEUINwupQgV4i6PVixqsdZt4ye9/H9xFrYJl99pnZ787s7G5FexnALQyjN8eWMINneF/g25HUMIF1bLRp6xjPxexIbmIlJ5vDAwziQLbBHJtPmzpu7ATSwCruY0+BbRUj+J4+HcNqIpJVXCyxuEsJq+swjRMiFfdKQJoymr7j2xnWxObOKU5XO6liIefob2e0R+S3gsdpfLgkqJG+FbHPbUFnsv8i9UN0lYQ1fU8XgXqy/zn1eZwqCfqYuredQas9OYrbJUFF8/36sZT9vtSfMIYjJQAnUi8XgWayfzX1JA7hKbo7BDV9p4uMBkS1zYtS3YvX4mxMKyjZlCreiOqrbbei8Zx4JL+PYTbH1vAEd0SF9mzxHUu7ye0gRFR1cZ1czrEu3BW3xrRI5Qj2b/K7kgtZwclOQMTBbSRsVKSknVRFJGsimi84KyLe1ymsns4L4vAO4WC2ITwSe7KBb/jqz7dq3t/pbSkDYs+KHr6GSGUfLrT4/3YrrFIA7Bd31zCOp+0yXuE5PqTdObxs4b8onpylFv92JN1+v7hb26Ko4F2THpGu/wLrLYBN7SaoCVtsAZrdbRCRpnebID9w/V+AmrApEck1+AkahZY8yWPIVQAAAABJRU5ErkJggg=="></img> */}
                <img src="https://img.icons8.com/color/48/000000/search-more.png" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
GoogleApiWrapper({
  apiKey: 'AIzaSyDy7fG8VcN_upR7UZ7lC63h7cVbVwYu558',
  libraries: ["places", 'geocoding']
})(TaskMenu);


function mapStateToProps(state) {
  return {
    locations: state.locations.locations,
    distance: state.distance.distance,
    price: state.price.price,
    inperson: state.inperson.inperson,
    assigned: state.assigned.assigned
  }
}


export default connect(mapStateToProps, {
  changeDistance, changePrice, changeLocation, changeInPerson, changeTaskType
})(TaskMenu);