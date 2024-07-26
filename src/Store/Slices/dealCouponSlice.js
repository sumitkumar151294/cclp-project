import { createSlice } from "@reduxjs/toolkit";

export const dealCouponSlice = createSlice({
  name: "deal-coupon",
  initialState: {
    isLoading: false,
    isError: false,
    dealCouponData: [],
    message: "",
  },
  reducers: {
    onGetDealCoupon: (state) => {
      return {
        ...state,
        isgetLoading: true,
        getDealCouponData: [],
        getmessage: "",
      };
    },

    onGetDealCouponSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isgetLoading: false,
        getDealCouponData: data,
        getmessage:message,
        get_status_code:status_code,
      };
    },

    onGetDealCouponError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getDealCouponData: data,
        getmessage:message,
        get_status_code:status_code,
        isgetLoading: false,
      };
    },

    onPostDealCoupon: (state) => {
      return {
        ...state,
        isPostLoading: true,
        postDealCouponData: [],
      };
    },

    onPostDealCouponSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code="201" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postDealCouponData: postData,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPostDealCouponError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postDealCouponData: postData,
        postMessage:message,
        post_status_code:status_code,
        isPostLoading: false,
      };
    },
    onPostDealCouponReset: (state) => {
      return {
        ...state,
        postDealCouponData: [],
        postMessage:"",
        post_status_code:null
      };
    },

    onUpdateDealCoupon: (state) => {
      return {
        ...state,
        isUpdateLoading: true,
        updateDealCouponData: [],
        updateMessage: "",
      };
    },

    onUpdateDealCouponSuccess: (state, { payload }) => {
      const {data=[], message = "", status_code = "201" } = payload;
      return {
        ...state,
        isUpdateLoading: false,
        updateDealCouponData:data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdateDealCouponError: (state, { payload }) => {
      const {data=[], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateDealCouponData:data,
        updateMessage:message,
        update_status_code:status_code,
        isUpdateLoading: false,
      };
    },
    onUpdateDealCouponReset: (state) => {
      return {
        ...state,
        updateMessage:"",
        updateDealCouponData:[],
        update_status_code:null,
      };
    },
  },
});

export const {
 onGetDealCoupon,
 onGetDealCouponSuccess,
 onGetDealCouponError,
 onPostDealCoupon,
 onPostDealCouponSuccess,
 onPostDealCouponError,
 onPostDealCouponReset,
 onUpdateDealCoupon,
 onUpdateDealCouponSuccess,
 onUpdateDealCouponError,
 onUpdateDealCouponReset
} = dealCouponSlice.actions;

export default dealCouponSlice.reducer;
