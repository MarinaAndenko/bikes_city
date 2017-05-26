import React, { PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import pluralize from 'pluralize';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Navbar from "../../layout/Navbar";
import TariffDuration from "./TariffDuration";
import TariffsDialog from './TariffsDialog';
import ConfirmDialog from "../shared/ConfirmDialog";

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  table: {
    fixedHeader: false,
    fixedFooter: false,
    stripedRows: false,
    showRowHover: true,
    selectable: false,
    enableSelectAll: false,
    deselectOnClickaway: false,
    showCheckboxes: false
  }
};

class AdminTariffsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayTariffs: [],
      monthTariffs: [],
      seasonTariffs: [],
      openDialog: false,
    };

    this.handleCreateNewDay = this.handleCreateNewDay.bind(this);
    this.handleCreateNewMonth = this.handleCreateNewMonth.bind(this);
    this.handleCreateNewSeason = this.handleCreateNewSeason.bind(this);
  }

  setTariffs(tariffs){
    let newTariffs = [];
    tariffs.map(function(tariff) {
      newTariffs.push({ start_point: tariff.start_point, end_point: tariff.end_point, price: tariff.price });
    });
    return newTariffs;
  }

  handleCreateNewDay(){
    this.setState({
      openDialog: true,
      handleSaveMethod: 'day',
    });
  }

  handleCreateNewMonth(){
    this.setState({
      openDialog: true,
      handleSaveMethod: 'month',
    });
  }

  handleCreateNewSeason(){
    this.setState({
      openDialog: true,
      handleSaveMethod: 'season',
    });
  }

  handleCloseDialog = () => {
    this.setState({openDialog: false});
  };

  handleSave = (type, start_point, end_point, price) => {
    $.post( '/api/admin/tariffs',{
      type: type,
      tariff_duration: {
        start_point: start_point,
        end_point: end_point,
        price: price,
      }
    }, function(data) {
      this.setState({
        dayTariffs: this.setTariffs(data.day_tariffs),
        monthTariffs: this.setTariffs(data.month_tariffs),
        seasonTariffs: this.setTariffs(data.season_tariffs),
        openDialog: false,
      })
    }.bind(this)).fail(function() {});
  };

  componentWillMount(){
    $.get( '/api/admin/tariffs', function(data) {
      this.setState({
        dayTariffs: this.setTariffs(data.day_tariffs),
        monthTariffs: this.setTariffs(data.month_tariffs),
        seasonTariffs: this.setTariffs(data.season_tariffs),
      })
    }.bind(this)).fail(function() {});
  }

  render(){
    return(
      <div>
        <Navbar pageTitle='Tariffs' loggedId={true}/>
        <Tabs>
          <Tab label="Day">
            <div className="tab-layout">
              <h2 style={styles.headline}>Day</h2>
              <Card>
                <CardActions>
                  <FlatButton label="Add New" onTouchTap={this.handleCreateNewDay} />
                </CardActions>
                <TariffDuration tariffs={this.state.dayTariffs} info={'day'} />
              </Card>
            </div>
          </Tab>
          <Tab label="Month" >
            <div className="tab-layout">
              <h2 style={styles.headline}>Month</h2>
              <Card>
                <CardActions>
                  <FlatButton label="Add New" onTouchTap={this.handleCreateNewMonth} />
                </CardActions>
                <TariffDuration tariffs={this.state.monthTariffs} info={'month'} />
              </Card>
            </div>
          </Tab>
          <Tab label="Season">
            <div className="tab-layout">
              <h2 style={styles.headline}>Season</h2>
              <Card>
                <CardActions>
                  <FlatButton label="Add New" onTouchTap={this.handleCreateNewSeason} />
                </CardActions>
                <TariffDuration tariffs={this.state.seasonTariffs} info={'№ of month'} />
              </Card>
            </div>
          </Tab>
        </Tabs>
        <TariffsDialog
          openDialog={this.state.openDialog}
          handleCloseDialog={this.handleCloseDialog}
          handleSaveMethod={this.state.handleSaveMethod}
          handleSave={this.handleSave}
          dialogTitle={'Edit'}
        />
        <ConfirmDialog
          openDialog={this.state.openConfirmDialog}
          handleCloseDialog={this.handleCloseConfirmDialog}
        />
      </div>
    );
  }
}

export default AdminTariffsMain;
