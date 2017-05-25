import React, { PropTypes } from 'react';
import Navbar from "./layout/Navbar";
import RaisedButton from 'material-ui/RaisedButton';

const Welcome = () => (
  <div>
    <Navbar pageTitle='Bikes City' loggedId={true}/>
    <div className="fotorama tab-main-layout">
      <img src="https://wallpaperscraft.ru/image/ukrashenie_velosiped_welcome_svet_106426_1920x1080.jpg" />
      <img src="https://wallpaperscraft.ru/image/velosiped_osen_listva_114430_1920x1080.jpg" />
      <img src="https://wallpaperscraft.ru/image/velosipedist_nogi_velosiped_reka_113856_1920x1080.jpg" />
    </div>

    <RaisedButton label="START" className={"tab-main-button"} primary={true} />
  </div>
);

export default Welcome;
