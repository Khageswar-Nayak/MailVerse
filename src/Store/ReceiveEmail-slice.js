import { createSlice } from "@reduxjs/toolkit";

const initialReceiveEMailState = {
  receiveEmails: [],
  countReceiveEmails: 0,
  selectedReceiveEmail: null,
};

const ReceiveEmailSlice = createSlice({
  name: "ReceiveEmails",
  initialState: initialReceiveEMailState,
  reducers: {
    setReceiveEmails(state, action) {
      state.receiveEmails = action.payload;
      let unreadMessage = 0;
      action.payload.map((email) => {
        if (!email.read) {
          unreadMessage++;
        }
      });
      state.countReceiveEmails = unreadMessage;
    },
    updateReceiveEmail(state, action) {
      // console.log("receiveEmail", action.payload);
      state.receiveEmails = action.payload;
      if (state.countReceiveEmails !== 0) {
        state.countReceiveEmails = Number(state.countReceiveEmails) - 1;
      }
    },
    setSelectedEmail(state, action) {
      state.selectedReceiveEmail = action.payload;
    },
  },
});

export const ReceiveEmailActions = ReceiveEmailSlice.actions;
export default ReceiveEmailSlice.reducer;
