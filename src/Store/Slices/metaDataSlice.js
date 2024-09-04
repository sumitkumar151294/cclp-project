import { createSlice } from "@reduxjs/toolkit";

export const metaDataSlice = createSlice({
  name: "meta-data",
  initialState: {
    isLoading: false,
    isError: false,
    metaData: [],
    message: "",
    isgetLoading: true,
  },
  reducers: {
    onGetMetaData: (state) => {
      return {
        ...state,
        isgetLoading: true,
        getMetaData: [],
        getmessage: "",
      };
    },

    onGetMetaDataSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isgetLoading: false,
        getMetaData: data,
        getmessage:message,
        get_status_code:status_code,
      };
    },

    onGetMetaDataError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getMetaData: data,
        getmessage:message,
        get_status_code:status_code,
        isgetLoading: false,
      };
    },

    onPostMetaData: (state) => {
      return {
        ...state,
        isPostLoading: true,
        postMetaData: [],
      };
    },

    onPostMetaDataSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code="200" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postMetaData: postData,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPostMetaDataError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postMetaData: postData,
        postMessage:message,
        post_status_code:status_code,
        isPostLoading: false,
      };
    },
    onPostMetaDataReset: (state) => {
      return {
        ...state,
        postMetaData: [],
        postMessage:"",
        post_status_code:null
      };
    },

    onUpdateMetaData: (state) => {
      return {
        ...state,
        isUpdateLoading: true,
        updateMetaData: [],
        updateMessage: "",
      };
    },

    onUpdateMetaDataSuccess: (state, { payload }) => {
      const {data=[], message = "", status_code = "200" } = payload;
      return {
        ...state,
        isUpdateLoading: false,
        updateMetaDataData:data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdateMetaDataError: (state, { payload }) => {
      const {data=[], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateMetaData:data,
        updateMessage:message,
        update_status_code:status_code,
        isUpdateLoading: false,
      };
    },
    onUpdateMetaDataReset: (state) => {
      return {
        ...state,
        updateMessage:"",
        updateMetaData:[],
        update_status_code:null,
      };
    },
  },
});

export const {
  onGetMetaData,
  onGetMetaDataSuccess,
  onGetMetaDataError,
  onPostMetaData,
  onPostMetaDataSuccess,
  onPostMetaDataError,
  onPostMetaDataReset,
  onUpdateMetaData,
  onUpdateMetaDataSuccess,
  onUpdateMetaDataError,
  onUpdateMetaDataReset
} = metaDataSlice.actions;

export default metaDataSlice.reducer;
