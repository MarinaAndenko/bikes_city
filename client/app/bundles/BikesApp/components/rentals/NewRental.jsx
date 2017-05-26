import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import _ from 'underscore';
import QRCode from 'qrcode.react';

import Navbar from "../layout/Navbar";

class NewRental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      valueAddress: null,
      valueType: null,
      valueHolder: null,
      valueNumber: null,
      valueExpDate: null,
      valueSeCode: null,
      errorHolderText: null,
      errorNumberText: null,
      errorExpDateText: null,
      errorSeCodeText: null,
      qrValue: 'null',
      paidSum: null,
      errorsAvaliable: false
    };
  }

  componentWillMount(){
    $.get( '/api/rentals/new', function(data) {
      this.setState({
        addresses: data.addresses,
        bikeTypes: data.bike_types,
      })
    }.bind(this)).fail(function() {});
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    if(stepIndex == 0){
      this.checkBike();
    }
    if(stepIndex == 1){
      this.saveRental();
    }
    // if (this.state.errorsAvaliable == false){
    //   this.setState({
    //     stepIndex: stepIndex + 1,
    //     finished: stepIndex >= 1,
    //   });
    // }
  }

  saveRental(){
    $.post( '/api/rentals',
      {
        type: this.state.valueType, address: this.state.valueAddress,
        payment: { card_holder: this.state.valueHolder, card_number: this.state.valueNumber,
        expiration_date: this.state.valueExpDate, security_code: this.state.valueSeCode },
      },
      function(data) {
        // debugger;
        this.setState({
          qrValue: data.bike_identifier,
          paidSum: data.sum,
          errorsAvaliable: false,
          stepIndex: this.state.stepIndex + 1,
          finished: this.state.stepIndex >= 1,
        })
      }.bind(this)).fail(function(data) {
        this.setState({
          errorHolderText: data.responseJSON.errors.card_holder,
          errorNumberText: data.responseJSON.errors.card_number,
          errorExpDateText: data.responseJSON.errors.expiration_date,
          errorSeCodeText: data.responseJSON.errors.security_code,
          errorsAvaliable: true
        });
      }.bind(this)
    );
  }

  checkBike(){
    $.get( '/api/rentals/check_bike', { type: this.state.valueType, address: this.state.valueAddress },
      function(data) {
        this.setState({
          errorsAvaliable: false,
          stepIndex: this.state.stepIndex + 1,
          finished: this.state.stepIndex >= 1,
        })
      }.bind(this)).fail(function() {
        this.setState({
          errorsAvaliable: true
        })
      }.bind(this)
    );
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  handleAddressChange = (event, index, value) => {
    this.setState({
      valueAddress: value
    });
  }

  handleTypeChange = (event, index, value) => {
    this.setState({
      valueType: value
    });
  }

  handleHolderChange = (e, value) => {
    this.setState({
      valueHolder: value,
      errorHolderText: null,
    });
  }

  handleNumberChange = (e, value) => {
    this.setState({
      valueNumber: value,
      errorNumberText: null,
    });
  }

  handleExpDateChange = (e, value) => {
    this.setState({
      valueExpDate: value,
      errorExpDateText: null,
    });
  }

  handleSeCodeChange = (e, value) => {
    this.setState({
      valueSeCode: value,
      errorSeCodeText: null,
    });
  }

  getStepContent(stepIndex) {
    const addressList = _.map(this.state.addresses, function(a){
      return <MenuItem value={a.id} primaryText={a.full_address} key={a.id} />
    });

    const typeList = _.map(this.state.bikeTypes, function(t, k){
      return <MenuItem value={t} primaryText={t} key={k} />
    });

    switch (stepIndex) {
      case 0:
        return  <div style = {{height: '320px'}}>
                  <SelectField
                    floatingLabelText="Choose Address"
                    value={this.state.valueAddress}
                    onChange={this.handleAddressChange}
                  >
                    {addressList}
                  </SelectField><br />
                  <SelectField
                    floatingLabelText="Chose Type"
                    value={this.state.valueType}
                    onChange={this.handleTypeChange}
                  >
                    {typeList}
                  </SelectField>
                </div>;
      case 1:
        return <div style = {{marginLeft: '60%'}}>
                 <TextField
                  floatingLabelText="Card Holder"
                  multiLine={true}
                  rows={2}
                  onChange={this.handleHolderChange}
                  errorText={this.state.errorHolderText}
                /><br />
                <TextField
                  floatingLabelText="Card Number"
                  onChange={this.handleNumberChange}
                  errorText={this.state.errorNumberText}
                /><br /><br />
                <DatePicker hintText="Expiration Date"
                onChange={this.handleExpDateChange}
                errorText={this.state.errorExpDateText}
                /><br />
                <TextField
                  floatingLabelText="Security Code"
                  onChange={this.handleSeCodeChange}
                  errorText={this.state.errorSeCodeText}
                /><br />
              </div>;
    }
  }

  render(){
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return(
      <div>
        <Navbar pageTitle='New Rental' loggedId={true}/>
        <div style={{width: '100%', maxWidth: 700, margin: 'auto', top: '70px', position: 'relative'}}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Adress and Bike</StepLabel>
            </Step>
            <Step>
              <StepLabel>Provide your Payment Info</StepLabel>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            {finished ? (
              <div style={{textAlign: 'center', paddingTop: '10%'}}>
                <p>Paid sum is {this.state.paidSum} UAH</p>
                <QRCode value={this.state.qrValue} /><br />
                <p>Your bike's genereted QR code</p>
              </div>
            ) : (
              <div>
                {this.getStepContent(stepIndex)}
                <div style={{marginTop: 12}}>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onTouchTap={this.handlePrev}
                    style={{marginRight: 12}}
                  />
                  <RaisedButton
                    label={stepIndex === 1 ? 'Finish' : 'Next'}
                    primary={true}
                    onTouchTap={this.handleNext}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NewRental;
