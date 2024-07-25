import { createSlice } from "@reduxjs/toolkit";

export const sectionMasterSlice = createSlice({
  name: "section-master",
  initialState: {
    isLoading: false,
    isError: false,
    sectionMasterData: [], 
    message: "",
  },
  reducers: {
    onGetsectionMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        sectionMasterData: [], 
        message: "",
      };
    },

    onGetsectionMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        sectionMasterData: data,  
        message,
        status_code,
      };
    },

    onGetsectionMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        sectionMasterData: data,
        message,
        status_code,
        isLoading: false,
        isError: true,
      };
    },

    onPostsectionMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        postRoleData: [],
      };
    },

    onPostsectionMasterSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code="201" } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        postRoleData: postData,
        message,
        status_code,
      };
    },

    onPostsectionMasterError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postRoleData: postData,
        message,
        status_code,
        isLoading: false,
        isError: true,
      };
    },
    onPostsectionMasterReset: (state) => {
      return {
        ...state,
        postRoleData: [], 
        message:"",
        status_code:null,
        isLoading: false,
        isError: false,
      };
    },

    onUpdatesectionMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        updatedsectionMasterData: [], 
        message: "",
      };
    },

    onUpdatesectionMasterSuccess: (state, { payload }) => {
      const { message = "", status_code = "201" } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        message,
        status_code,
      };
    },

    onUpdatesectionMasterError: (state, { payload }) => {
      const { message = "", status_code = 400 } = payload;
      return {
        ...state,
        message,
        status_code,
        isLoading: false,
        isError: true,
      };
    },
    onUpdatesectionMasterReset: (state, { payload }) => {
      return {
        ...state,
        message:"",
        status_code:null,
        isLoading: false,
        isError: false,
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
