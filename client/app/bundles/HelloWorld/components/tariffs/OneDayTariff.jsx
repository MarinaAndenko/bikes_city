import React, { PropTypes } from 'react';
var pluralize = require('pluralize');
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import _ from 'underscore';

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

class OneDayTariff extends React.Component {
  render(){
    let props = this.props.tariffs;
    let setTariffs = [];
    if (_.isEmpty(props) == false) {
      this.props.tariffs.map(function(tariff, i) {
        setTariffs.push(
          <TableRow key={i}>
            <TableRowColumn>{tariff.period}</TableRowColumn>
            <TableRowColumn>{tariff.price} UAH</TableRowColumn>
          </TableRow>
        );
      });
    }

    return(
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
    );
  }
}

export default OneDayTariff;
