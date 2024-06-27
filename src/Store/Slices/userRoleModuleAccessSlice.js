import { createSlice } from "@reduxjs/toolkit";

export const userRoleModuleAccessSlice = createSlice({
  name: "user-role-module-access",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    message: "",
  },
  reducers: {
    onGetUserRoleModuleAccess: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        message: "",
      };
    },

    onGetUserRoleModuleAccessSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = "201" } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data:data,
        message,
        status_code,
      };
    },

    onGetUserRoleModuleAccessError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        data,
        message,
        status_code,
        isLoading: false,
        isError: true,
      };
    },
    onGetUserRoleModuleAccessReset: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        message: "",
      };
    },
    onPostUserRoleModuleAccess: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    },

    onPostUserRoleModuleAccessSuccess: (state, { payload }) => {
      const {  data=[],message = "", status_code = "201" } = payload;
      return {
        ...state,
        data:data,
        isLoading: false,
        isError: false,
        message,
        status_code,
      };
    },

    onPostUserRoleModuleAccessError: (state, { payload }) => {
      const {  message = "", status_code = 400 } = payload;
      return {
        ...state,
        message,
        status_code,
        isLoading: false,
        isError: true,
      };
    },

    onPostUserRoleModuleAccessReset: (state) => {
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
export const { onGetUserRoleModuleAccess,
  onGetUserRoleModuleAccessSuccess,
  onGetUserRoleModuleAccessError,
  onGetUserRoleModuleAccessReset,
  onPostUserRoleModuleAccess, 
  onPostUserRoleModuleAccessReset,
  onPostUserRoleModuleAccessSuccess, 
  onPostUserRoleModuleAccessError
 } = userRoleModuleAccessSlice.actions;

export default userRoleModuleAccessSlice.reducer;
