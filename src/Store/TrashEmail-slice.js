import { createSlice } from "@reduxjs/toolkit";

const initialTrashEmailState = {
  trashEmails: [],
  countTrashEmails: 0,
};

const trashEmailSlice = createSlice({
  name: "trashEmails",
  initialState: initialTrashEmailState,
  reducers: {
    addToTrashEmails(state, action) {
      state.trashEmails.unshift(action.payload);
      state.countTrashEmails++;
    },
    setTrashEmails(state, action) {
      state.trashEmails = action.payload;
      state.countTrashEmails = action.payload.length;
    },
    deleteTrashEmail() {},
  },
});

export const trashEmailActions = trashEmailSlice.actions;

export default trashEmailSlice.reducer;
