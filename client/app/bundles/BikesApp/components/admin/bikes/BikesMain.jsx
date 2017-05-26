import React, { PropTypes } from 'react';
import {Link} from "react-router-dom";
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import pluralize from 'pluralize';
import _ from 'underscore';
import TextField from 'material-ui/TextField';

import Navbar from "../../layout/Navbar";
import BikeDialog from "./BikeDialog";
import ConfirmDialog from "../shared/ConfirmDialog";

const styles = {
  table: {
    fixedHeader: true,
    fixedFooter: false,
    stripedRows: false,
    showRowHover: true,
    selectable: false,
    enableSelectAll: false,
    deselectOnClickaway: false,
    showCheckboxes: false,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};

class BikesMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bikesList: [],
      openDialog: false,
      openConfirmDialog: false,
      dialogParams: {}
    };

    this.handleOpenConfirmDialog = this.handleOpenConfirmDialog.bind(this);
  }

  compare(a,b){
    if (a.start_point < b.start_point)
      return -1;
    if (a.start_point > b.start_point)
      return 1;
    return 0;
  }

  componentWillMount(){
    $.get( '/api/admin/bikes', function(data) {
      this.setState({
        bikesList: data,
      })
    }.bind(this)).fail(function() {});
  }

  handleFilter = (e, value) =>{
    $.get( '/api/admin/bikes/filter', { pattern: value }, function(data) {
      this.setState({
        bikesList: data,
      })
    }.bind(this)).fail(function() {});
  }

  handleCreateNew = () => {
    $.get( '/api/admin/bikes/new', function(data) {
      this.setState({
        openDialog: true,
        dialogParams: {
          identifier: data.identifier,
          address: data.address
        }
      });
    }.bind(this)).fail(function() {});
  };

  handleCloseDialog = () => {
    this.setState({openDialog: false});
  };

  handleOpenConfirmDialog(){
    this.setState({openConfirmDialog: true});
  }

  handleCloseConfirmDialog = () => {
    this.setState({openConfirmDialog: false});
  }

  handleSave = (action, identifier, start_date, bike_type, address) => {
    if(action == 'create'){
      $.post( '/api/admin/bikes',{
        bike:{
          identifier: identifier,
          start_date: start_date,
          bike_type: bike_type,
        },
        address: address
      }, function(data) {
        this.setState({
          bikesList: data,
          openDialog: false,
        })
      }.bind(this)).fail(function() {});
    }
  };

  render(){
    let setBikes = [];
    if (_.isEmpty(this.state.bikesList) == false) {
      this.state.bikesList.map(function(bike, i) {
        setBikes.push(
          <TableRow key={i}>
            <TableRowColumn>{bike.identifier}</TableRowColumn>
            <TableRowColumn>{bike.start_date}</TableRowColumn>
            <TableRowColumn>{bike.bike_type}</TableRowColumn>
            <TableRowColumn>{bike.full_address}</TableRowColumn>
            <TableRowColumn>{bike.rentals_count}</TableRowColumn>
            <TableRowColumn>
              <Toggle
                key={'blocked' + i}
                style={styles.toggle}
                defaultToggled={bike.blocked}
              />
            </TableRowColumn>
            <TableRowColumn>
              <Toggle
                key={'stolen' + i}
                thumbStyle={styles.thumbOff}
                trackStyle={styles.trackOff}
                thumbSwitchedStyle={styles.thumbSwitched}
                trackSwitchedStyle={styles.trackSwitched}
                labelStyle={styles.labelStyle}
                defaultToggled={bike.stolen}
              />
            </TableRowColumn>
            <TableRowColumn>
              <i className="material-icons" style={{margin: 0}}>create</i>
              <i className="material-icons" style={{margin: 0}}>delete</i>
            </TableRowColumn>
          </TableRow>
        );
      });
    }

    return(
      <div>
        <Navbar pageTitle='Bikes' loggedId={true}/>
          <div className="tab-bikes-layout">
            <Card>
              <CardHeader
                title="Filters & Actions"
                actAsExpander={false}
                showExpandableButton={false}
              />
              <CardActions>
                <FlatButton label="Add New" onTouchTap={this.handleCreateNew } />
                <TextField
                  hintText="Filter by Identifier"
                  onChange={this.handleFilter}
                />
              </CardActions>
              <Table
                fixedHeader={styles.table.fixedHeader}
                fixedFooter={styles.table.fixedFooter}
                selectable={styles.table.selectable}
                multiSelectable={styles.table.multiSelectable}
                height={'440px'}
              >
                <TableHeader
                displaySelectAll={styles.table.showCheckboxes}
                adjustForCheckbox={styles.table.showCheckboxes}
                >
                  <TableRow>
                    <TableHeaderColumn>Identifier</TableHeaderColumn>
                    <TableHeaderColumn>Date of Introduction</TableHeaderColumn>
                    <TableHeaderColumn>Type</TableHeaderColumn>
                    <TableHeaderColumn>Address</TableHeaderColumn>
                    <TableHeaderColumn>Number of Rentals</TableHeaderColumn>
                    <TableHeaderColumn>On Tech Examination</TableHeaderColumn>
                    <TableHeaderColumn>Was Slolen?</TableHeaderColumn>
                    <TableHeaderColumn>Actions</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={styles.table.showCheckboxes}
                  deselectOnClickaway={styles.table.deselectOnClickaway}
                  showRowHover={styles.table.showRowHover}
                  stripedRows={styles.table.stripedRows}
                >
                { setBikes }
                </TableBody>
              </Table>
            </Card>

          </div>
          <BikeDialog
            openDialog={this.state.openDialog}
            handleCloseDialog={this.handleCloseDialog}
            dialogParams={this.state.dialogParams}
            handleSave={this.handleSave}
            dialogTitle='Add New Bike'
          />
          <ConfirmDialog
            openDialog={this.state.openConfirmDialog}
            handleCloseDialog={this.handleCloseConfirmDialog}
          />
      </div>
    );
  }
}

export default BikesMain;
