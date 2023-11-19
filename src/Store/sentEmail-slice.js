import { createSlice } from "@reduxjs/toolkit";

const initialSentEmailState = {
  sentEmails: [],
  countSentEmails: 0,
  selectedSentEmail: null,
};

const sentEmailSlice = createSlice({
  name: "sentEmails",
  initialState: initialSentEmailState,
  reducers: {
    setSentEmails(state, action) {
      state.sentEmails = action.payload;
      state.countSentEmails = action.payload.length;
    },
    addSentEmails(state, action) {
      state.sentEmails.unshift(action.payload);
      state.countSentEmails += 1;
    },
    setSelectedEmail(state, action) {
      state.selectedSentEmail = action.payload;
    },
    removeSentEmail(state, action) {
      state.sentEmails = action.payload;
      state.countSentEmails--;
    },
    deleteAllSentEmails(state) {
      state.sentEmails = [];
      state.countSentEmails = 0;
    },
  },
});

export const sentEmailActions = sentEmailSlice.actions;
export default sentEmailSlice.reducer;
