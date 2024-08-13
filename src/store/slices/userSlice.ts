import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, UserType } from '../../types/types';

const initialState: UserType = {
  data: [
    {
      name: '',
      age: 0,
      email: '',
      password: '',
      gender: 'not selected',
      acceptTC: 'not accepted',
      confirmPassword: '',
    },
  ],
  date: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      state.data = [action.payload, ...state.data];
      state.date = new Date().getTime();
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
