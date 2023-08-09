import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-slice";
import sentEmailReducer from "./sentEmail-slice";
import activeReducer from "./Sidebar-slice";
import ReceiveMailReducer from "./ReceiveMail-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    sentEmail: sentEmailReducer,
    sidebar: activeReducer,
    receiveMail: ReceiveMailReducer,
  },
});

export default store;
