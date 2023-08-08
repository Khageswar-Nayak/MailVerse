import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
  emails: [],
  countEmails: 0,
};

const mailSlice = createSlice({
  name: "mails",
  initialState: initialMailState,
  reducers: {
    setMails(state, action) {
      state.emails = action.payload;
      state.countEmails = action.payload.length;
    },
    addMails(state, action) {
      //   console.log(action.payload);
      state.emails.unshift(action.payload);
      state.countEmails += 1;
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
