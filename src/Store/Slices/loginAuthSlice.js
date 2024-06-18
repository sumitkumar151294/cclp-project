import { createSlice } from "@reduxjs/toolkit";

export const loginAuthSlice = createSlice({
  name: "loginAuth",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    message: "",
  },
  reducers: {
    onLoginAuthSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        message: "",
      };
    },

    onLoginAuthSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = "201" } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data,
        message,
        status_code
      };
    },

    onLoginAuthError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        data,
        message,
        status_code,
        isLoading: false,
        isError: true,
      };
    },
    onLoginAuthReset: (state) => {
      return {
        ...state,
        message:"",
        status_code:null,
        isLoading: false,
        isError: false,
      };
    },
  },
});
export const { onLoginAuthSubmit, onLoginAuthError, onLoginAuthSuccess, onLoginAuthReset } =
loginAuthSlice.actions;

export default loginAuthSlice.reducer;
