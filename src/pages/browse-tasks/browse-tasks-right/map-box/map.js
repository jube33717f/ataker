import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleApiWrapper} from 'google-maps-react';
// import { Map, GoogleApiWrapper, InfoWindow, Marker  } from 'google-maps-react';
const mapStyles = {
    map: {
      position: 'absolute',
      width: '70%',
      height: '100%'

    }
  };

export class CurrentLocation extends React.Component {
    constructor(props) {
      super(props);
    
      const { lat, lng } = this.props.initialCenter;
      this.state = {
        currentLocation: {
          lat: lat,
          lng: lng
        },
      
      };
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log('???',this.props.locations);
        console.log(prevProps,)
        
        if(prevProps.zoom!==this.props.zoom||prevProps.google !== this.props.google){
            console.log(this.props.zoom)
            this.loadMap();
        }     
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        
        }
        if(this.props.locations!==''&&this.props.locations!==prevProps.locations){
            this.recenterMap();
        }
        console.log(this.state.currentLocation)
            
        
      }
    recenterMap() {
        const map = this.map;
        
        

        const google = this.props.google;
        const maps = google.maps;
        
        if (this.props.locations==='') {
            console.log('1')
            const current = this.state.currentLocation;
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }else{
            console.log('**',this.props.locations)
            let center = this.props.locations
            map.panTo(center);
        }
        
    }
    componentDidMount() {
        if (this.props.locations!=='') return;
        if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
              const coords = pos.coords;
              this.setState({
                currentLocation: {
                  lat: coords.latitude,
                  lng: coords.longitude
                }
              });
            });
          }
        }
        this.loadMap();
    }
    loadMap() {
        if (this.props && this.props.google) {
          // checks if google is available
          const { google } = this.props;
          const maps = google.maps;
    
          const mapRef = this.refs.map;
    
          // reference to the actual DOM element
          const node = ReactDOM.findDOMNode(mapRef);
          let  zoom  = 14;
          if(this.props.zoom!=''){
            zoom  = this.props.zoom;
          }
          console.log('zoom',zoom)
          //let  zoom  = this.props.zoomValue;
          const { lat, lng } = this.state.currentLocation;
          const center = new maps.LatLng(lat, lng);
          const mapConfig = Object.assign(
            {},
            {
              center: center,
              zoom: zoom
            }
          );
    
          // maps.Map() is constructor that instantiates the map
          this.map = new maps.Map(node, mapConfig);
        }
     }
    renderChildren() {
        const { children } = this.props;
    
        if (!children) return;
    
        return React.Children.map(children, c => {
          if (!c) return;
          return React.cloneElement(c, {
            map: this.map,
            google: this.props.google,
            mapCenter: this.state.currentLocation
          });
        });
      }
    
    render() {
        const style = Object.assign({}, mapStyles.map);
       return (
         <div>
           <div style={style} ref="map">
             Loading map...
           </div>
           {this.renderChildren()}
         </div>
       );
     }
  }
// export default CurrentLocation;
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDy7fG8VcN_upR7UZ7lC63h7cVbVwYu558'
})(CurrentLocation);
  CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
    lat: -1.2884,
    lng: 36.8233
   },
  centerAroundCurrentLocation: false,
  visible: true
};
