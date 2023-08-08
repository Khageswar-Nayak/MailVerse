import { createSlice } from "@reduxjs/toolkit";

const initialActiveState = {
  activeButton: "inbox",
};

const activeSlice = createSlice({
  name: "sideButton",
  initialState: initialActiveState,
  reducers: {
    setActiveButton(state, action) {
      state.activeButton = action.payload;
    },
  },
});

export const sidebarButtonActions = activeSlice.actions;

export default activeSlice.reducer;
