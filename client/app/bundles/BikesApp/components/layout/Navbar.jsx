import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Menu from './Menu';

class Navbar extends React.Component {
  render() {
    return(
      <div>
        <AppBar
          title={this.props.pageTitle}
          iconElementLeft={
            <a>
              <i className="material-icons" style={{color: 'white', marginTop: 11}}>home</i>
            </a>
          }
          iconElementRight={
            <Menu/>
          }
        />
      </div>
    );
  }
}

export default Navbar;
