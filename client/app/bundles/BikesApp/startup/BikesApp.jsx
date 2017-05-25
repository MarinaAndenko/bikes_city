import React from 'react'
import { Provider } from 'react-redux';
// import { browserHistory } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import configureStore from '../store/BikesAppStore';
// import HelloWorldContainer from '../containers/HelloWorldContainer';
import Welcome from '../components/Welcome';
// import Navbar from '../components/layout/Navbar';
import TariffsMain from '../components/tariffs/TariffsMain';
import NewRental from '../components/rentals/NewRental';

import BikesMain from '../components/admin/bikes/BikesMain';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// const history = (props) => syncHistoryWithStore(browserHistory, configureStore(props))

const BikesApp = (props, _railsContext) => (
  <Provider store={configureStore(props)}>
    <MuiThemeProvider>
      <BrowserRouter history={history}>
        <main>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/admin/bikes" component={BikesMain} />
          <Route exact path="/tariffs" component={TariffsMain} />
          <Route exact path="/rentals/new" component={NewRental} />
        </main>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

export default BikesApp;
