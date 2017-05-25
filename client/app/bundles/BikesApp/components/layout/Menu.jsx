import React, { PropTypes } from 'react';
import {Link} from "react-router-dom";
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Menu extends React.Component{
  render(){
    let userMenu = null;
    if (this.props.loggedIn) {
      userMenu =  <div>
        <MenuItem primaryText="Sign out" />
       </div>;
    } else {
      userMenu = <MenuItem primaryText="Sign in" />;
    }

    return(
      <IconMenu
        iconButtonElement={
          <IconButton iconStyle={{color: 'white'}}><MoreVertIcon/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Prices & Tariffs" containerElement={<Link to="/tariffs"/>}/>
        <MenuItem primaryText="Rent a Bike" containerElement={<Link to="/rentals/new"/>}/>
        <MenuItem primaryText="Addresses" />
        {userMenu}
      </IconMenu>
    );
  }
}

export default Menu;