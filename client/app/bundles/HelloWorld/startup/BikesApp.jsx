import React from 'react'
import { Provider } from 'react-redux';
// import { browserHistory } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import configureStore from '../store/helloWorldStore';
// import HelloWorldContainer from '../containers/HelloWorldContainer';
// import HelloWorld from '../components/HelloWorld';
// import Navbar from '../components/layout/Navbar';
import TariffsMain from '../components/tariffs/TariffsMain';
import NewRental from '../components/rentals/NewRental';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// const history = (props) => syncHistoryWithStore(browserHistory, configureStore(props))

const HelloWorldApp = (props, _railsContext) => (
  <Provider store={configureStore(props)}>
    <MuiThemeProvider>
      <BrowserRouter history={history}>
        <main>
          {/*<Route path="/bikes" component={Navbar} />*/}
          <Route path="/tariffs" component={TariffsMain} />
          {/*<Route path="/hello_world" component={HelloWorld} />*/}
          <Route path="/rentals/new" component={NewRental} />
        </main>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

export default HelloWorldApp;
