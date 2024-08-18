import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileType, UserData, UserType } from '../../types/types';

const initialState: UserType = {
  data: [
    {
      name: '',
      age: 0,
      email: '',
      password: '',
      gender: '',
      acceptTC: false,
      country: '',
      confirmPassword: '',
      userPicture: '',
      pictureName: '',
    },
  ],
  date: 0,
  files: [
    {
      name: '',
      base64: '',
      size: 0,
    },
  ],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      state.data = [action.payload, ...state.data];
      state.date = new Date().getTime();
    },
    setUserFile(state, action: PayloadAction<FileType>) {
      state.files = [action.payload, ...state.files];
    },
  },
});

export const { setUserData, setUserFile } = userSlice.actions;
export default userSlice.reducer;
