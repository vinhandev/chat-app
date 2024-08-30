import { configureStore } from '@reduxjs/toolkit';
import { channelReducer, userReducer, userSaga } from './reducers';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  user: userReducer,
  channel: channelReducer,
} as const;

function* rootSaga() {
  yield all([userSaga()]);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
