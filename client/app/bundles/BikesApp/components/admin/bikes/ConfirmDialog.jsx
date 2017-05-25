import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

const style = {
  marginLeft: 20,
};

class ConfirmDialog extends React.Component {

  handleCloseDialog = () => {
    this.setState({openDialog: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        onTouchTap={this.handleCloseDialog}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.openDialog}
          onRequestClose={this.handleCloseDialog}
        >
          Are you sure?
        </Dialog>
      </div>
    );
  }
}

export default ConfirmDialog;
