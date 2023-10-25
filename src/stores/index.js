import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './auth/reducer';

const store = configureStore({
  reducer: {
    auth: authUserReducer,
  },
});

export default store;
