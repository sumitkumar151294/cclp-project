import { createSlice } from "@reduxjs/toolkit";

export const testMaster = createSlice({
  name: "test",
  initialState: {
    getfaqMaster: {},
  },
  reducers: {
    onGetTestMaster: (state) => {
      return {
        getTestMaster: {},
      };
    },
    onGetTestMasterSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        getTestMaster: data,
        message,
        status_code,
      };
    },
    onGetTestMasterError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        getTestMaster: data,
        message,
        status_code,
      };
    },
    OnGetTestMasterReset: (state) => {
      return {
        ...state,
        getTestMaster: {},
        message: "",
        status_code: null,
      };
    },
  },
});

export const {
  onGetTestMaster,
  onGetTestMasterSuccess,
  onGetTestMasterError,
  OnGetTestMasterReset,
} = testMaster.actions;

export default testMaster.reducer;
