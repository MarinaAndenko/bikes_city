import React, { PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Box from 'react-layout-components';
import {Link} from "react-router-dom";
import pluralize from 'pluralize';

import Navbar from "../layout/Navbar";
import OneDayTariff from './OneDayTariff';
import MonthTariff from './MonthTariff';
import SeasonTariff from './SeasonTariff';

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
      else
        newTariffs.push({ period: tariff.start_point+' - '+tariff.end_point+' '+pluralize(q, tariff.end_point), price: tariff.price });
    });
    return newTariffs;
  }

  componentWillMount(){
    $.get( '/api/tariffs', function(data) {
      let forDay = data.day.sort(this.compare);
      let forMonth = data.month.sort(this.compare);
      let forSeason = data.season.sort(this.compare);
      this.setState({
        dayTariffs: this.setDayMonthTariffs(forDay, 'hour'),
        monthTariffs: this.setDayMonthTariffs(forMonth, 'month'),
        seasonTariffs: forSeason,
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
              <OneDayTariff tariffs={this.state.dayTariffs}/>
            </div>
          </Tab>
          <Tab label="Monthly" >
            <div className="tab-layout">
              <h2 style={styles.headline}>Monthly</h2>
              <OneDayTariff tariffs={this.state.monthTariffs}/>
            </div>
          </Tab>
          <Tab label="Seasonal">
            <div className="tab-layout">
              <h2 style={styles.headline}>Seasonal</h2>
              <SeasonTariff/>
            </div>
          </Tab>
        </Tabs>
        <Link to={"/tariffs"}>Press me</Link>
      </div>
    );
  }
}

export default TariffsMain;
