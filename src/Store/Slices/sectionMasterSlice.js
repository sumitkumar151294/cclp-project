import { createSlice } from "@reduxjs/toolkit";

export const sectionMasterSlice = createSlice({
  name: "section-master",
  initialState: {
    isLoading: false,
    isError: false,
    sectionMasterData: [],
    message: "",
    isgetLoading: true,
  },
  reducers: {
    onGetsectionMaster: (state) => {
      return {
        ...state,
        isgetLoading: true,
        getsectionMasterData: [],
        getmessage: "",
      };
    },

    onGetsectionMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isgetLoading: false,
        getsectionMasterData: data,
        getmessage:message,
        get_status_code:status_code,
      };
    },

    onGetsectionMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getsectionMasterData: data,
        getmessage:message,
        get_status_code:status_code,
        isgetLoading: false,
      };
    },

    onPostsectionMaster: (state) => {
      return {
        ...state,
        isPostLoading: true,
        postSectionMasterData: [],
      };
    },

    onPostsectionMasterSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code="201" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postSectionMasterData: postData,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPostsectionMasterError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {

        ...state,
        postSectionMasterData: postData,
        postMessage:message,
        post_status_code:status_code,
        isPostLoading: false,
      };
    },
    onPostsectionMasterReset: (state) => {
      return {
        ...state,
        postSectionMasterData: [],
        postMessage:"",
        post_status_code:null
      };
    },

    onUpdatesectionMaster: (state) => {
      return {
        ...state,
        isUpdateLoading: true,
        updateSectionMasterData: [],
        updateMessage: "",
      };
    },

    onUpdatesectionMasterSuccess: (state, { payload }) => {
      const {data=[], message = "", status_code = "201" } = payload;
      return {
        ...state,
        isUpdateLoading: false,
        updateSectionMasterData:data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdatesectionMasterError: (state, { payload }) => {
      const {data=[], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateSectionMasterData:data,
        updateMessage:message,
        update_status_code:status_code,
        isUpdateLoading: false,
      };
    },
    onUpdatesectionMasterReset: (state) => {
      return {
        ...state,
        updateMessage:"",
        updateSectionMasterData:[],
        update_status_code:null,
      };
    },
  },
});

export const {
  onGetsectionMaster,
  onGetsectionMasterSuccess,
  onGetsectionMasterError,
  onPostsectionMaster,
  onPostsectionMasterSuccess,
  onPostsectionMasterError,
  onUpdatesectionMaster,
  onUpdatesectionMasterSuccess,
  onUpdatesectionMasterError,
  onUpdatesectionMasterReset,
  onPostsectionMasterReset
} = sectionMasterSlice.actions;

export default sectionMasterSlice.reducer;
