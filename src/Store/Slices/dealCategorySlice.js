import { createSlice } from "@reduxjs/toolkit";

export const dealCategorySlice = createSlice({
  name: "deal-category",
  initialState: {
    isLoading: false,
    isError: false,
    dealCategoryData: [],
    message: "",
    isPostLoading: false,
  },
  reducers: {
    onGetDealCategory: (state) => {
      return {
        ...state,
        isgetLoading: true,
        getDealCategoryData: [],
        getmessage: "",
      };
    },

    onGetDealCategorySuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isgetLoading: false,
        getDealCategoryData: data,
        getmessage:message,
        get_status_code:status_code,
      };
    },

    onGetDealCategoryError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getDealCategoryData: data,
        getmessage:message,
        get_status_code:status_code,
        isgetLoading: false,
      };
    },

    onPostDealCategory: (state) => {
      return {
        ...state,
        isPostLoading: true,
        postDealCategoryData: [],
      };
    },

    onPostDealCategorySuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code="200" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postDealCategoryData: postData,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPostDealCategoryError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postDealCategoryData: postData,
        postMessage:message,
        post_status_code:status_code,
        isPostLoading: false,
      };
    },
    onPostDealCategoryReset: (state) => {
      return {
        ...state,
        postDealCategoryData: [],
        postMessage:"",
        post_status_code:null
      };
    },

    onUpdateDealCategory: (state) => {
      return {
        ...state,
        isUpdateLoading: true,
        updateDealCategoryData: [],
        updateMessage: "",
      };
    },

    onUpdateDealCategorySuccess: (state, { payload }) => {
      const {data=[], message = "", status_code = "200" } = payload;
      return {
        ...state,
        isUpdateLoading: false,
        updateDealCategoryData:data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdateDealCategoryError: (state, { payload }) => {
      const {data=[], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateDealCategoryData:data,
        updateMessage:message,
        update_status_code:status_code,
        isUpdateLoading: false,
      };
    },
    onUpdateDealCategoryReset: (state) => {
      return {
        ...state,
        updateMessage:"",
        updateDealCategoryData:[],
        update_status_code:null,
      };
    },
  },
});

export const {
  onGetDealCategory,
  onGetDealCategorySuccess,
  onGetDealCategoryError,
  onPostDealCategory,
  onPostDealCategorySuccess,
  onPostDealCategoryError,
  onPostDealCategoryReset,
  onUpdateDealCategory,
  onUpdateDealCategorySuccess,
  onUpdateDealCategoryError,
  onUpdateDealCategoryReset
} = dealCategorySlice.actions;

export default dealCategorySlice.reducer;
