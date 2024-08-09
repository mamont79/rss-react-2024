import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserType = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'not selected';
  acceptTC: 'accepted' | 'not accepted';
};

const initialState: UserType = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: 'not selected',
  acceptTC: 'not accepted',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserType>) {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.password = action.payload.password;
      state.email = action.payload.email;
      state.gender = action.payload.gender;
      state.acceptTC = action.payload.acceptTC;
    },
  },
});

export default userSlice.reducer;
