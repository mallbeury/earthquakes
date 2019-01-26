/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, FlyToInterpolator} from 'react-map-gl';

import Pin from './pin';

const TOKEN = 'pk.eyJ1IjoibWFsbGJldXJ5IiwiYSI6IjJfV1MzaE0ifQ.scrjDE31p7wBx7-GemqV3A'; // Set your mapbox token here

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 1,
        bearing: 0,
        pitch: 0
      }
    };
  }

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }

  _onViewportChange(viewport) {
    this.setState({viewport: {...this.state.viewport, ...viewport}});
  }

  showSelectedMarker() {
    let self = this;

    if (this.props.selectedEarthquake) {
      let marker = this.props.markers.find(function(marker){
        return marker.id == self.props.selectedEarthquake;
      });

      if (marker) {
        this.showMarker(marker);
      }
    }
  }

  showMarker(marker) {
    this._onViewportChange({
      longitude: marker.geometry.coordinates[0],
      latitude: marker.geometry.coordinates[1],
      zoom: 8,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
  }

  render() {
    const {viewport} = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="400px"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN} >
        {
          this.props.markers.map(function(marker, idx) {
            return <Marker 
              key={marker.id}
              longitude={marker.geometry.coordinates[0]}
              latitude={marker.geometry.coordinates[1]}
            >
              <Pin size={10} />
            </Marker>
          })
        }
      </MapGL>
    );
  }

}
