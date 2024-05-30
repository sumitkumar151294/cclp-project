import { createSlice } from "@reduxjs/toolkit";

export const offerMaster = createSlice({
  name: "offerMaster",
  initialState: {
    getOfferMaster: {},
  },
  reducers: {
    onGetOfferMaster: (state) => {
      return {
        getOfferMaster: {},
      };
    },
    onGetOfferMasterSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        getOfferMaster: data,
        message,
        status_code,
      };
    },
    onGetOfferMasterError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        getOfferMaster: data,
        message,
        status_code,
      };
    },
    OnGetOfferMasterReset: (state) => {
      return {
        ...state,
        getOfferMaster: {},
        message: "",
        status_code: null,
      };
    },
  },
});

export const {
  onGetOfferMaster,
  onGetOfferMasterSuccess,
  onGetOfferMasterError,
  OnGetOfferMasterReset,
} = offerMaster.actions;

export default offerMaster.reducer;
