import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import configureStore from '../store/BikesAppStore';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Welcome from '../components/Welcome';
import BikesMain from '../components/admin/bikes/BikesMain';
import TariffsMain from '../components/tariffs/TariffsMain';
import NewRental from '../components/rentals/NewRental';

const history = (props) => syncHistoryWithStore(browserHistory, configureStore(props))

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
