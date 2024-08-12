import { createSlice } from "@reduxjs/toolkit";

export const userRoleSlice = createSlice({
  name: "user-role",
  initialState: {
    isLoading: false,
    isError: false,
    userRoleData: [], 
    message: "",
    isgetLoading: true,
  },
  reducers: {
    onGetUserRole: (state) => {
      return {
        ...state,
        isgetLoading: true,
        isError: false,
        userRoleData: [], 
        message: "",
      };
    },

    onGetUserRoleSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = "200" } = payload;
      return {
        ...state,
        isgetLoading: false,
        isError: false,
        userRoleData: data,  
        message,
        status_code,
      };
    },

    onGetUserRoleError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        userRoleData: data,  
        message,
        status_code,
        isgetLoading: false,
        isError: true,
      };
    },

    onPostUserRole: (state) => {
      return {
        ...state,
        isPostLoading: true,
        isError: false,
        postRoleData: [], 
      };
    },

    onPostUserRoleSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code="201" } = payload;
      return {
        ...state,
        isPostLoading: false,
        isError: false,
        postRoleData: postData,
        message,
        status_code,
      };
    },

    onPostUserRoleError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postRoleData: postData, 
        message,
        status_code,
        isPostLoading: false,
        isError: true,
      };
    },
    onPostUserRoleReset: (state) => {
      return {
        ...state,
        postRoleData: [], 
        message:"",
        status_code:null,
        isPostLoading: false,
        isError: false,
      };
    },

    onUpdateUserRole: (state) => {
      return {
        ...state,
        isUpdateLoading: true,
        isError: false,
        updatedUserRoleData: [], 
        message: "",
      };
    },

    onUpdateUserRoleSuccess: (state, { payload }) => {
      const { message = "", status_code = "205" } = payload;
      return {
        ...state,
        isUpdateLoading: false,
        isError: false,
        message,
        status_code,
      };
    },

    onUpdateUserRoleError: (state, { payload }) => {
      const { message = "", status_code = 400 } = payload;
      return {
        ...state,
        message,
        status_code,
        isUpdateLoading: false,
        isError: true,
      };
    },
    onUpdateUserRoleReset: (state, { payload }) => {
      return {
        ...state,
        message:"",
        status_code:null,
        isUpdateLoading: false,
        isError: false,
      };
    },
  },
});

export const {
  onGetUserRole,
  onGetUserRoleSuccess,
  onGetUserRoleError,
  onPostUserRole,
  onPostUserRoleSuccess,
  onPostUserRoleError,
  onUpdateUserRole,
  onUpdateUserRoleSuccess,
  onUpdateUserRoleError,
  onUpdateUserRoleReset,
  onPostUserRoleReset
} = userRoleSlice.actions;

export default userRoleSlice.reducer;
