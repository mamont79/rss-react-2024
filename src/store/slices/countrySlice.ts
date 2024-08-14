import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countries } from '../../constants/contries';

type CountyStateType = {
  countries: string[];
  output: string[];
};

const initialState: CountyStateType = {
  countries: countries,
  output: [],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    filterCountries(state, action: PayloadAction<string>) {
      state.output = state.countries.filter((country) =>
        country.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { filterCountries } = countrySlice.actions;
export default countrySlice.reducer;
