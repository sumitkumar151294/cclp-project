import { createSlice } from "@reduxjs/toolkit";

export const dealCouponCodeSlice = createSlice({
  name: "deal-coupon-code",
  initialState: {
    isLoading: false,
    isError: false,
    dealCouponCodeData: [],
    message: "",
  },
  reducers: {
    onGetDealCouponCode: (state) => {
      return {
        ...state,
        isgetLoading: true,
        getDealCouponCodeData: [],
        getmessage: "",
      };
    },

    onGetDealCouponCodeSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isgetLoading: false,
        getDealCouponCodeData: data,
        getmessage:message,
        get_status_code:status_code,
      };
    },

    onGetDealCouponCodeError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getDealCouponCodeData: data,
        getmessage:message,
        get_status_code:status_code,
        isgetLoading: false,
      };
    },

    onPostDealCouponCode: (state) => {
      return {
        ...state,
        isPostLoading: true,
        postDealCouponCodeData: [],
      };
    },

    onPostDealCouponCodeSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code="200" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postDealCouponCodeData: postData,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPostDealCouponCodeError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postDealCouponCodeData: postData,
        postMessage:message,
        post_status_code:status_code,
        isPostLoading: false,
      };
    },
    onPostDealCouponCodeReset: (state) => {
      return {
        ...state,
        postDealCouponCodeData: [],
        postMessage:"",
        post_status_code:null
      };
    },

    onUpdateDealCouponCode: (state) => {
      return {
        ...state,
        isUpdateLoading: true,
        updateDealCouponCodeData: [],
        updateMessage: "",
      };
    },

    onUpdateDealCouponCodeSuccess: (state, { payload }) => {
      const {data=[], message = "", status_code = "200" } = payload;
      return {
        ...state,
        isUpdateLoading: false,
        updateDealCouponCodeData:data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdateDealCouponCodeError: (state, { payload }) => {
      const {data=[], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateDealCouponCodeData:data,
        updateMessage:message,
        update_status_code:status_code,
        isUpdateLoading: false,
      };
    },
    onUpdateDealCouponCodeReset: (state) => {
      return {
        ...state,
        updateMessage:"",
        updateDealCouponCodeData:[],
        update_status_code:null,
      };
    },
  },
});

export const {
   onGetDealCouponCode,
   onGetDealCouponCodeSuccess,
   onGetDealCouponCodeError,
   onPostDealCouponCode,
   onPostDealCouponCodeSuccess,
   onPostDealCouponCodeError,
   onPostDealCouponCodeReset,
   onUpdateDealCouponCode,
   onUpdateDealCouponCodeSuccess,
   onUpdateDealCouponCodeError,
   onUpdateDealCouponCodeReset
} = dealCouponCodeSlice.actions;

export default dealCouponCodeSlice.reducer;
