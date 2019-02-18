import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const persistConfig = {
  timeout: 10000,
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['selected', 'shareContent'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = applyMiddleware(thunkMiddleware);

export default function configureStore() {

  let store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store);
  return { store, persistor };
}
