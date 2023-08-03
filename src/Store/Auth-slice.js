import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLogin: true,
  email: "",
  idToken: "",
};

const authSlice = createSlice({
  name: "Authentication",
  initialState: initialAuthState,
  reducers: {
    setLogin(state) {
      state.isLogin = !state.isLogin;
    },
    login(state, action) {
      state.idToken = action.payload.idToken;
      state.email = action.payload.email;
    },
    logout() {},
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
