import { createSlice } from "@reduxjs/toolkit";

const initialTopCheckBoxState = {
  isChecked: false,
};

const TopCheckBoxSlice = createSlice({
  name: "TopCheckBox",
  initialState: initialTopCheckBoxState,
  reducers: {
    TopCheckBoxChange(state) {
      state.isChecked = !state.isChecked;
    },
  },
});

export const TopCheckBoxActions = TopCheckBoxSlice.actions;

export default TopCheckBoxSlice.reducer;
