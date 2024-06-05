import { createSlice } from "@reduxjs/toolkit";

export const moduleSlice = createSlice({
  name: "module",
  initialState: {
    isLoading: false,
    isError: false,
    data:[],
    message: "",
  },
  reducers: {
    onGetModule: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        message: "",
      };
    },

    onGetModuleSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code  } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data,
        message,
        status_code,
      };
    },

    onGetModuleError: (state, { payload }) => {
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
    onGetModuleReset: (state) => {
      return {
        ...state,
        data:null,
        message:null,
        status_code:null,
        isLoading: false,
        isError: true,
      };
    }
  },
});
export const {onGetModule, onGetModuleSuccess, onGetModuleError ,onGetModuleReset } =
moduleSlice.actions;

export default moduleSlice.reducer;