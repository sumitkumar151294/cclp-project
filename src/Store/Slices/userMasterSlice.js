import { createSlice } from "@reduxjs/toolkit";

export const userMasterSlice = createSlice({
  name: "userMaster",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    message: "",
  },
  reducers: {
    onUserSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        postdata: [],
        message: "",
        status_code:null
      };
    },

    onUserSubmitSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code = "201" } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        postdata:postData,
        message,
        status_code,
      };
    },

    onUserSubmitReset: (state) => {
      return {
        ...state,
        status_code:null,
      };
    },

    onUserSubmitError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postdata:postData,
        message,
        status_code,
        isLoading: false,
        isError: true,
      };
    },

    onGetUser: (state) => {
      return { ...state, isLoading: true, getData: [], getmessage: '', isError: false };
    },
    onGetUserSuccess: (state, { payload }) => {
      const { data = [], message = '', status_code } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        getData:data,
        getmessage:message,
        status_code
      };
    },
    onGetUserError: (state, { payload }) => {
      const { data = [], message = '', status_code } = payload;
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
        updatedUserData: [],  
        message: "",
        status_code:null
      };
    },

    onUserUpdateSuccess: (state, { payload }) => {
      const { updateData = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        updatedUserData: updateData,  
        message,
        status_code,
      };
    },

    onUserUpdateError: (state, { payload }) => {
      const { updateData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updatedUserData: updateData,  
        message,
        status_code,
        isLoading: false,
        isError: true,
      };
    },

  },
});
export const { onUserSubmit, onUserSubmitReset, onUserSubmitError, onUserSubmitSuccess, onGetUser,   onGetUserSuccess, onGetUserError, onUserUpdate, onUserUpdateSuccess, onUserUpdateError } =
  userMasterSlice.actions;

export default userMasterSlice.reducer;
