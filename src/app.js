/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Map from './Map';
import EarthquakeTable from './EarthquakeTable';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      earthquakes: [],
      selectedEarthquake: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  handleData(data) {
    this.setState({earthquakes: data});

    // fetch again
    setTimeout(this.fetchData.bind(this), 10000);
  }

  fetchData() {
    console.log('fetchData');

    let self = this;

    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
//      console.log('json response', json);
      self.handleData(json.features);
    });
  }

  dispatchSelEarthquakeAction(id) {
    this.setState({selectedEarthquake: id}, function() {
      this.refs.childMap.showSelectedMarker();
    });
  }

  render() {
    let self = this;

    let sortedEarthquakes = this.state.earthquakes;
    sortedEarthquakes.sort(function(a, b){
      return b.properties.time - a.properties.time;
    });

    let selectedEarthquake = this.state.selectedEarthquake;

    return (
      <Paper>
        <Card>
         <CardHeader
            title="Latest Earthquakes"
            subheader="earthquake.usgs.gov"
          />
          <CardContent>
            <div id="map">
              <Map markers={sortedEarthquakes} selectedEarthquake={selectedEarthquake} ref="childMap" />
            </div>
          </CardContent>
        </Card>
        <EarthquakeTable earthquakes={sortedEarthquakes} selectedEarthquake={selectedEarthquake} onSelEarthquake={this.dispatchSelEarthquakeAction.bind(this)} />
      </Paper>
    );
  }
}
