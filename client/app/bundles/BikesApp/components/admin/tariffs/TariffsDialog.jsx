import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

const style = {
  marginLeft: 20,
};

class BikeDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      start_point: null,
      end_point: null,
      price: null,
    };
  }

  handleSave = () => {
    this.props.handleSave(
      this.props.handleSaveMethod,
      this.state.start_point,
      this.state.end_point,
      this.state.price,
    )
    this.setState({
      start_point: null,
      end_point: null,
      price: null,
    });
  }

  handleStartChange = (e, value) => {
    this.setState({
      start_point: value
    });
  }

  handleEndChange = (e, value) => {
    this.setState({
      end_point: value
    });
  }

  handlePriceChange = (e, value) => {
    this.setState({
      price: value
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
            hintText="Start Point" style={style} underlineShow={false}
            onChange={this.handleStartChange}
          />
          <Divider />
          <TextField
            hintText="End Point" style={style} underlineShow={false}
            onChange={this.handleEndChange}
          />
          <Divider />
          <TextField
            hintText="Price" style={style} underlineShow={false}
            onChange={this.handlePriceChange}
          />
          <Divider />
        </Dialog>
      </div>
    );
  }
}

export default BikeDialog;