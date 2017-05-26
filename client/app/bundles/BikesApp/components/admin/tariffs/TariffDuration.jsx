import React, { PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
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
  },
};

class TariffDuration extends React.Component {

  render(){
    let setTariffs = [];
    if (_.isEmpty(this.props.tariffs) == false) {
      this.props.tariffs.map(function(tariff, i) {
        setTariffs.push(
          <TableRow key={i}>
            <TableRowColumn>{tariff.start_point}</TableRowColumn>
            <TableRowColumn>{tariff.end_point}</TableRowColumn>
            <TableRowColumn>{tariff.price} UAH</TableRowColumn>
            <TableRowColumn>
              <i className="material-icons" style={{margin: 0}}>create</i>
              <i className="material-icons" style={{margin: 0}}>delete</i>
            </TableRowColumn>
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
        height={'400px'}
      >
        <TableHeader
        displaySelectAll={styles.table.showCheckboxes}
        adjustForCheckbox={styles.table.showCheckboxes}
        >
          <TableRow>
            <TableHeaderColumn>Start ({this.props.info})</TableHeaderColumn>
            <TableHeaderColumn>Finish ({this.props.info})</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
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

export default TariffDuration;
