import React, { PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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

class MonthTariff extends React.Component {
  render(){
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
          <TableRow key={1}>
            <TableRowColumn>No free minutes</TableRowColumn>
            <TableRowColumn></TableRowColumn>
          </TableRow>
          <TableRow key={2}>
            <TableRowColumn>0-30 min</TableRowColumn>
            <TableRowColumn>50 UAH</TableRowColumn>
          </TableRow>
          <TableRow key={3}>
            <TableRowColumn>Each next hour</TableRowColumn>
            <TableRowColumn>50 UAH</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

export default MonthTariff;