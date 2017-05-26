import React, { PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Box from 'react-layout-components';
import pluralize from 'pluralize';

import Navbar from "../layout/Navbar";
import TariffDescription from './TariffDescription';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
};

class TariffsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayTariffs: {},
      monthTariffs: {},
      seasonTariffs: {},
    };
  }

  compare(a,b){
    if (a.start_point < b.start_point)
      return -1;
    if (a.start_point > b.start_point)
      return 1;
    return 0;
  }

  setDayMonthTariffs(tariffs, q){
    let newTariffs = [];
    tariffs.map(function(tariff) {
      if(tariff.start_point == 0)
        newTariffs.push({ period: 'Till '+tariff.end_point+' '+pluralize(q, tariff.end_point), price: tariff.price });
      else{
        if(tariff.start_point == tariff.end_point)
          newTariffs.push({ period: tariff.start_point+' '+pluralize(q, 1), price: tariff.price });
        else
          newTariffs.push({ period: tariff.start_point+' - '+tariff.end_point+' '+pluralize(q, tariff.end_point), price: tariff.price });
      }
    });
    return newTariffs;
  }

  setSeasonTariffs(tariffs){
    let newTariffs = [], season = null;
    tariffs.map(function(tariff) {
      switch(tariff.start_point) {
        case 3:
          season = 'Spring';
            break;
        case 6:
          season = 'Summer';
            break;
        case 9:
          season = 'Autumn';
            break;
      }
      newTariffs.push({ period: season, price: tariff.price });
    });
    return newTariffs;
  }

  componentWillMount(){
    $.get( '/api/tariffs', function(data) {
      let forDay = data.day.sort(this.compare);
      let forMonth = data.month.sort(this.compare);
      let forSeason = data.season.sort(this.compare);
      this.setState({
        dayTariffs: this.setDayMonthTariffs(forDay, 'day'),
        monthTariffs: this.setDayMonthTariffs(forMonth, 'month'),
        seasonTariffs: this.setSeasonTariffs(forSeason),
      })
    }.bind(this)).fail(function() {});
  }

  render(){
    return(
      <div>
        <Navbar pageTitle='Tariffs & Prices' loggedId={true}/>
        <Tabs>
          <Tab label="Pay as You Go">
            <div className="tab-layout">
              <h2 style={styles.headline}>Pay as You Go</h2>
              <TariffDescription tariffs={this.state.dayTariffs} tarriffType='day'/>
            </div>
          </Tab>
          <Tab label="Monthly" >
            <div className="tab-layout">
              <h2 style={styles.headline}>Monthly</h2>
              <TariffDescription tariffs={this.state.monthTariffs} tarriffType='month'/>
            </div>
          </Tab>
          <Tab label="Seasonal">
            <div className="tab-layout">
              <h2 style={styles.headline}>Seasonal</h2>
              <TariffDescription tariffs={this.state.seasonTariffs} tarriffType='season'/>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default TariffsMain;
