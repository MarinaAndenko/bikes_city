import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import _ from 'underscore';
import {Link} from "react-router-dom";

const styles = {
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

class TariffDescription extends React.Component {
  render(){
    let setTariffs = [];
    if (_.isEmpty(this.props.tariffs) == false) {
      this.props.tariffs.map(function(tariff, i) {
        setTariffs.push(
          <TableRow key={i}>
            <TableRowColumn>{tariff.period}</TableRowColumn>
            <TableRowColumn>{tariff.price} UAH</TableRowColumn>
          </TableRow>
        );
      });
    }

    let newRoute = this.props.tarriffType == 'day' ? <Link to="/rentals/new"/> : <Link to="/user_tariffs/new"/>

    return(
      <div>
        <Table
          fixedHeader={styles.table.fixedHeader}
          fixedFooter={styles.table.fixedFooter}
          selectable={styles.table.selectable}
          multiSelectable={styles.table.multiSelectable}
        >
          <TableBody
            displayRowCheckbox={styles.table.showCheckboxes}
            deselectOnClickaway={styles.table.deselectOnClickaway}
            showRowHover={styles.table.showRowHover}
            stripedRows={styles.table.stripedRows}
          >
          { setTariffs }
          </TableBody>
        </Table>
        <div className='assign-tariff-button'>
         <RaisedButton label="Take a Bike!" primary={true} containerElement={newRoute}/>
        </div>
      </div>
    );
  }
}

export default TariffDescription;
