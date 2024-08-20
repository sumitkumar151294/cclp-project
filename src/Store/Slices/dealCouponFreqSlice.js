import { createSlice } from "@reduxjs/toolkit";

export const dealCouponFreqSlice = createSlice({
  name: "deal-coupon-freq",
  initialState: {
    isLoading: false,
    isError: false,
    dealCouponFreqData: [],
    message: "",
    isgetLoading: true,
  },
  reducers: {
    onGetDealCouponFreq: (state) => {
      return {
        ...state,
        isgetLoading: true,
        getDealCouponFreqData: [],
        getmessage: "",
      };
    },

    onGetDealCouponFreqSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isgetLoading: false,
        getDealCouponFreqData: data,
        getmessage:message,
        get_status_code:status_code,
      };
    },

    onGetDealCouponFreqError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getDealCouponFreqData: data,
        getmessage:message,
        get_status_code:status_code,
        isgetLoading: false,
      };
    },

    onPostDealCouponFreq: (state) => {
      return {
        ...state,
        isPostLoading: true,
        postDealCouponFreqData: [],
      };
    },

    onPostDealCouponFreqSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code="201" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postDealCouponFreqData: postData,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPostDealCouponFreqError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postDealCouponFreqData: postData,
        postMessage:message,
        post_status_code:status_code,
        isPostLoading: false,
      };
    },
    onPostDealCouponFreqReset: (state) => {
      return {
        ...state,
        postDealCouponFreqData: [],
        postMessage:"",
        post_status_code:null
      };
    },

    onUpdateDealCouponFreq: (state) => {
      return {
        ...state,
        isUpdateLoading: true,
        updateDealCouponFreqData: [],
        updateMessage: "",
      };
    },

    onUpdateDealCouponFreqSuccess: (state, { payload }) => {
      const {data=[], message = "", status_code = "201" } = payload;
      return {
        ...state,
        isUpdateLoading: false,
        updateDealCouponFreqData:data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdateDealCouponFreqError: (state, { payload }) => {
      const {data=[], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateDealCouponFreqData:data,
        updateMessage:message,
        update_status_code:status_code,
        isUpdateLoading: false,
      };
    },
    onUpdateDealCouponFreqReset: (state) => {
      return {
        ...state,
        updateMessage:"",
        updateDealCouponFreqData:[],
        update_status_code:null,
      };
    },
  },
});

export const {
  onGetDealCouponFreq,
  onGetDealCouponFreqSuccess,
  onGetDealCouponFreqError,
  onPostDealCouponFreq,
  onPostDealCouponFreqSuccess,
  onPostDealCouponFreqError,
  onPostDealCouponFreqReset,
  onUpdateDealCouponFreq,
  onUpdateDealCouponFreqSuccess,
  onUpdateDealCouponFreqError,
  onUpdateDealCouponFreqReset
} = dealCouponFreqSlice.actions;

export default dealCouponFreqSlice.reducer;
