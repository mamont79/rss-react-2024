import { createSlice } from '@reduxjs/toolkit';
import { SelectedPokemonType } from '../../types/types';

type SelectedState = {
  amount: number;
  selectedData: SelectedPokemonType[];
};

const initialState: SelectedState = {
  amount: 0,
  selectedData: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    resetAll(state) {
      state.amount = 0;
      state.selectedData = [];
    },
    addSelected(state, action) {
      state.selectedData = [...state.selectedData, ...action.payload];
      state.amount += 1;
    },
    removeFromSelected(state, action) {
      state.selectedData = state.selectedData.filter(
        (item) => item.name !== action.payload[0].name
      );
      state.amount -= 1;
    },
  },
});

export const { resetAll, addSelected, removeFromSelected } =
  selectedSlice.actions;

export default selectedSlice.reducer;
