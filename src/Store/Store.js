import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-slice";
import sentEmailReducer from "./sentEmail-slice";
import activeReducer from "./Sidebar-slice";
import ReceiveEmailReducer from "./ReceiveEmail-slice";
import TrashEmailReducer from "./TrashEmail-slice";
import TopCheckBoxReducer from "./TopCheckBox-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sentEmail: sentEmailReducer,
    sidebar: activeReducer,
    receiveEmail: ReceiveEmailReducer,
    trashEmail: TrashEmailReducer,
    topCheckBox: TopCheckBoxReducer,
  },
});

export default store;
