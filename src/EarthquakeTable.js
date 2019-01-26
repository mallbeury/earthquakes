/* global window */
import React, {Component} from 'react';
import {Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import Moment from 'react-moment';

export default class EarthquakeMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let self = this;

    return (
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
          this.props.earthquakes.map(function(earthquake, idx) {
            return <TableRow key={earthquake.id} hover={true} selected={earthquake.id == self.props.selectedEarthquake ? true : false} onClick={self.props.onSelEarthquake.bind(self, earthquake.id)}>
              <TableCell>{earthquake.properties.place}</TableCell>
              <TableCell>{earthquake.properties.mag}</TableCell>
              <TableCell><Moment format="DD/MM/YYYY HH:MM">{earthquake.properties.time}</Moment></TableCell>
            </TableRow>
          })
        }
        </TableBody>
      </Table>      
    );
  }

}
