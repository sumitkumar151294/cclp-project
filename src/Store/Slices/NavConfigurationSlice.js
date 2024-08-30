import { createSlice } from "@reduxjs/toolkit";

export const NavConfigurationSlice = createSlice({
  name: "nav-configuration",
  initialState: {
    isLoading: false,
    isError: false,
    navConfigureData: [],
    message: "",
    isgetLoading: true,
  },
  reducers: {
    onGetNavConfigure: (state) => {
      return {
        ...state,
        isgetLoading: true,
        getNavConfigureData: [],
        getmessage: "",
      };
    },

    onGetNavConfigureSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isgetLoading: false,
        getNavConfigureData: data,
        getmessage:message,
        get_status_code:status_code,
      };
    },

    onGetNavConfigureError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getNavConfigureData: data,
        getmessage:message,
        get_status_code:status_code,
        isgetLoading: false,
      };
    },

    onPostNavConfigure: (state) => {
            return {
        ...state,
        isPostLoading: true,
        postNavConfigureData: [],
      };
    },

    onPostNavConfigureSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code="201" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postNavConfigureData: postData,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPostNavConfigureError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postNavConfigureData: postData,
        postMessage:message,
        post_status_code:status_code,
        isPostLoading: false,
      };
    },
    onPostNavConfigureReset: (state) => {
      return {
        ...state,
        postNavConfigureData: [],
        postMessage:"",
        post_status_code:null
      };
    }
  },
});

export const {
  onGetNavConfigure,
  onGetNavConfigureSuccess,
  onGetNavConfigureError,
  onPostNavConfigure,
  onPostNavConfigureSuccess,
  onPostNavConfigureError,
  onPostNavConfigureReset
} = NavConfigurationSlice.actions;

export default NavConfigurationSlice.reducer;
