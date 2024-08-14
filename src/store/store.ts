import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import countryReducer from './slices/countrySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
