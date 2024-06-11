import { createSlice } from "@reduxjs/toolkit";

export const userMasterSlice = createSlice({
  name: "userMaster",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
  },
  reducers: {
    onUserSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        postdata: {},
        error: {},
        message: "",
        status_code:null
      };
    },

    onUserSubmitSuccess: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        postdata:postData,
        message,
        status_code,
        error: {},
      };
    },

    onUserSubmitReset: (state) => {
      return {
        ...state,
        status_code:null,
      };
    },

    onUserSubmitError: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postdata:postData,
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },

    onGetUser: (state) => {
      return { ...state, isLoading: true, getData: {}, getmessage: '', error: {}, isError: false };
    },
    onGetUserSuccess: (state, { payload }) => {
      const { data = {}, message = '', status_code } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        getData:data,
        error: {},
        getmessage:message,
        status_code
      };
    },
    onGetUserError: (state, { payload }) => {
      const { data = {}, message = '', status_code } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        getData:data,
        getmessage:message,
        status_code
      };
    },
    onUserUpdate: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        updatedUserData: {},  
        error: {},
        message: "",
        status_code:null
      };
    },

    onUserUpdateSuccess: (state, { payload }) => {
      const { updateData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        updatedUserData: updateData,  
        message,
        status_code,
        error: {},
      };
    },

    onUserUpdateError: (state, { payload }) => {
      const { updateData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        updatedUserData: updateData,  
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },

  },
});
export const { onUserSubmit, onUserSubmitReset, onUserSubmitError, onUserSubmitSuccess, onGetUser, onGetUserSuccess, onGetUserError, onUserUpdate, onUserUpdateSuccess, onUserUpdateError } =
  userMasterSlice.actions;

export default userMasterSlice.reducer;
