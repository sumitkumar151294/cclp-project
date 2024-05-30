import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './StoreReducer';
import rootSaga from '../Sagas';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const devMode = process.env.NODE_ENV === 'development';
const persistConfig = {
  key: 'root',
  storage
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(middleware),
  devTools: devMode
});

export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);