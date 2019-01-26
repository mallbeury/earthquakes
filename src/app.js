/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import {Card, CardHeader, CardContent} from '@material-ui/core';

import Moment from 'react-moment';
import Map from './Map';

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

  dispatchClickRowAction(id) {
    this.setState({selectedEarthquake: id}, function() {
      this.refs.child.showSelectedMarker();
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
              <Map markers={sortedEarthquakes} selectedEarthquake={selectedEarthquake} ref="child" />
            </div>
          </CardContent>
        </Card>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Place</TableCell>
              <TableCell>Magnitude</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            sortedEarthquakes.map(function(earthquake, idx) {
              return <TableRow key={earthquake.id} hover={true} selected={earthquake.id == selectedEarthquake ? true : false} onClick={self.dispatchClickRowAction.bind(self, earthquake.id)}>
                <TableCell>{earthquake.properties.place}</TableCell>
                <TableCell>{earthquake.properties.mag}</TableCell>
                <TableCell><Moment format="DD/MM/YYYY HH:MM">{earthquake.properties.time}</Moment></TableCell>
              </TableRow>
            })
          }
          </TableBody>
        </Table>
      </Paper>
    );
  }

}

export function renderToDom(container) {
  render(<App/>, container);
}
