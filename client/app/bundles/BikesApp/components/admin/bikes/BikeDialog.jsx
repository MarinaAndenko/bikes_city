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

class BikeDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      start_date: null,
      bike_type: null,
    };
  }

  handleSave = () => {
    let start_date = this.state.start_date || this.props.dialogParams.start_date;
    let bike_type = this.state.bike_type || this.props.dialogParams.bike_type;
    this.props.handleSave(
      'create',
      this.props.dialogParams.identifier,
      start_date,
      bike_type
    )
    this.setState({
      start_date: null,
      bike_type: null,
    });
  }

  handleStartDateChange = (e, value) => {
    this.setState({
      start_date: value
    });
  }

  handleTypeChange = (value) => {
    this.setState({
      bike_type: value
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleCloseDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSave}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.props.dialogTitle}
          actions={actions}
          modal={true}
          open={this.props.openDialog}
          onRequestClose={this.props.handleClose}
        >
          <TextField
            hintText="Identifier" style={style} underlineShow={false}
            defaultValue={this.props.dialogParams.identifier} disabled={true}
            onChange={this.h}
          />
          <Divider />
          <DatePicker
            hintText="Start Date" style={style} underlineShow={false}
            defaultValue={this.props.dialogParams.start_date}
            onChange={this.handleStartDateChange}
          />
          <Divider />
          <AutoComplete
            openOnFocus={true}
            dataSource={['man', 'woman', 'boy', 'girl']}
            hintText="Type"
            fullWidth={true}
            style={style}
            underlineShow={false}
            filter={AutoComplete.caseInsensitiveFilter}
            defaultValue={this.props.dialogParams.bike_type}
            onUpdateInput={this.handleTypeChange}
          />
          <Divider />
          <AutoComplete
            openOnFocus={true}
            dataSource={this.props.dialogParams.address || []}
            hintText="Address"
            fullWidth={true}
            style={style}
            underlineShow={false}
            filter={AutoComplete.caseInsensitiveFilter}
            onUpdateInput={this.handleTypeChange}
          />
          <Divider />
        </Dialog>
      </div>
    );
  }
}

export default BikeDialog;
