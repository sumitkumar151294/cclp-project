import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    isError: false,
    status_code:"",
    data: [],
    message: ""
  },
  reducers: {
    onLoginSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    },

    onLoginSubmitSuccess: (state, { payload }) => {
      const { data, message, status_code } = payload;
      return {
        ...state,
        data:data,
        isLoading: false,
        isError: false,
        status_code,
        message,
      };
    },

    onLoginSubmitError: (state, { payload }) => {
      const { message, status_code = 400 } = payload;
      return {
        ...state,
        status_code,
        isLoading: false,
        isError: true,
        message,
      };
    },
    onLogout: (state) => {
      return {
        ...state,
        data: [],
        isError: false,
        isLoading: false,
        message: "",
      };
    }
  }
});
export const {
  onLoginSubmit,
  onLoginSubmitError,
  onLoginSubmitSuccess,
  onLogout,
} = loginSlice.actions;

export default loginSlice.reducer;
