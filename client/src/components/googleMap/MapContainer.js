import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { InfoWindow, Marker } from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: true,   //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker
      
    };
    
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

  render() {

      return (
        <Map
        google={this.props.google}
        zoom={16}
        style={{width: this.props.width, height: this.props.height}}
        initialCenter={{
          lat: 34.9006667,
          lng: -82.3337363
        }}
        >
        <Marker
          onClick={this.onMarkerClick}
          name={'Kukee Bliss Yoga at Chris Chiropractic Services'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
          </Map>
        );
     
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDFjd85G0ZOtOpRjJ42H9Q5nC0UqCdiQ9g'
})(MapContainer);