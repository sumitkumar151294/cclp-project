import { createSlice } from "@reduxjs/toolkit";

export const faqMaster = createSlice({
  name: "faqMaster",
  initialState: {
    getfaqMaster: {},
  },
  reducers: {
    onGetFaqMaster: (state) => {
      return {
        getFaqMaster: {},
      };
    },
    onGetFaqMasterSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        getFaqMaster: data,
        message,
        status_code,
      };
    },
    onGetFaqMasterError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        getFaqMaster: data,
        message,
        status_code,
      };
    },
    OnGetFaqMasterReset: (state) => {
      return {
        ...state,
        getFaqMaster: {},
        message: "",
        status_code: null,
      };
    },
  },
});

export const {
  onGetFaqMaster,
  onGetFaqMasterSuccess,
  onGetFaqMasterError,
  OnGetFaqMasterReset,
} = faqMaster.actions;

export default faqMaster.reducer;
