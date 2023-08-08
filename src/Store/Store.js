import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-slice";
import mailReducer from "./MailData-slice";
import activeReducer from "./Sidebar-slice";
import ReceiveMailReducer from "./ReceiveMail-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    mail: mailReducer,
    sidebar: activeReducer,
    receiveMail: ReceiveMailReducer,
  },
});

export default store;
