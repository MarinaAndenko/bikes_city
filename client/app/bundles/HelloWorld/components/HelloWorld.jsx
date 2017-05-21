import React, { PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Box from 'react-layout-components';
import {Link} from "react-router-dom";
import Navbar from "./layout/Navbar";

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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

const HelloWorld = () => (
  <div>
    <Navbar pageTitle='Tariffs' loggedId={true}/>
    <Tabs>
      <Tab label="Pay as You Go">
        <div className="tab-layout">
          <h2 style={styles.headline}>Pay as You Go</h2>
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
        </div>
      </Tab>
      <Tab label="Item Two" >
        <div>
          <h2 style={styles.headline}>Tab Two</h2>
          <p>
            This is another example tab.
          </p>
        </div>
      </Tab>
      <Tab
        label="onActive"
      >
        <div>
          <h2 style={styles.headline}>Tab Three</h2>
          <p>
            This is a third example tab.
          </p>
        </div>
      </Tab>
    </Tabs>
    <Link to={"/bikes"}>Press me</Link>
  </div>
);

// const HelloWorld = ({ name, updateName }) => (
//   <div>
//     <h3>
//       Hello, {name}!
//     </h3>
//     <hr />
//     <form >
//       <label htmlFor="name">
//         Say hello to:
//       </label>
//       <input
//         id="name"
//         type="text"
//         value={name}
//         onChange={(e) => updateName(e.target.value)}
//       />
//       <Link to={"/bikes"}>Press me</Link>
//     </form>
//   </div>
// );

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
};

export default HelloWorld;
