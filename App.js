import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './app/store/configureStore';
import Root from './app/root';

const { store, persistor } = configureStore();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      store: store,
    };
  }
  render() {
    return (
      <Provider store={this.state.store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    );
  }
}


