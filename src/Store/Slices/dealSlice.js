import { createSlice } from "@reduxjs/toolkit";

export const dealSlice = createSlice({
  name: "deal",
  initialState: {
    isLoading: false,
    isError: false,
    dealData: [],
    message: "",
  },
  reducers: {
    onGetDeal: (state) => {
      return {
        ...state,
        isgetLoading: true,
        getDealData: [],
        getmessage: "",
      };
    },

    onGetDealSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isgetLoading: false,
        getDealData: data,
        getmessage:message,
        get_status_code:status_code,
      };
    },

    onGetDealError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getDealData: data,
        getmessage:message,
        get_status_code:status_code,
        isgetLoading: false,
      };
    },

    onPostDeal: (state) => {
      return {
        ...state,
        isPostLoading: true,
        postDealData: [],
      };
    },

    onPostDealSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code="201" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postDealData: postData,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPostDealError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postDealData: postData,
        postMessage:message,
        post_status_code:status_code,
        isPostLoading: false,
      };
    },
    onPostDealReset: (state) => {
      return {
        ...state,
        postDealData: [],
        postMessage:"",
        post_status_code:null
      };
    },

    onUpdateDeal: (state) => {
      return {
        ...state,
        isUpdateLoading: true,
        updateDealData: [],
        updateMessage: "",
      };
    },

    onUpdateDealSuccess: (state, { payload }) => {
      const {data=[], message = "", status_code = "201" } = payload;
      return {
        ...state,
        isUpdateLoading: false,
        updateDealData:data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdateDealError: (state, { payload }) => {
      const {data=[], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateDealData:data,
        updateMessage:message,
        update_status_code:status_code,
        isUpdateLoading: false,
      };
    },
    onUpdateDealReset: (state) => {
      return {
        ...state,
        updateMessage:"",
        updateDealData:[],
        update_status_code:null,
      };
    },
  },
});

export const {
  onGetDeal,
  onGetDealSuccess,
  onGetDealError,
  onPostDeal,
  onPostDealSuccess,
  onPostDealError,
  onPostDealReset,
  onUpdateDeal,
  onUpdateDealSuccess,
  onUpdateDealError,
  onUpdateDealReset
} = dealSlice.actions;

export default dealSlice.reducer;
