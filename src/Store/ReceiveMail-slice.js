import { createSlice } from "@reduxjs/toolkit";

const initialReceiveMailState = {
  ReceiveMails: [],
  countReceiveEmails: 0,
};

const ReceiveMailSlice = createSlice({
  name: "ReceiveMails",
  initialState: initialReceiveMailState,
  reducers: {
    setReceiveMails(state, action) {
      state.ReceiveMails = action.payload;
      state.countReceiveEmails = action.payload.length;
    },
  },
});

export const ReceiveMailActions = ReceiveMailSlice.actions;
export default ReceiveMailSlice.reducer;
