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
      const { data = [], message = "", status_code = "200" } = payload;
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
    onUpdateUserRoleModuleAccess: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        message: "",
      };
    },

    onUpdateUserRoleModuleAccessSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = "205" } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data:data,
        message,
        status_code,
      };
    },

    onUpdateUserRoleModuleAccessError: (state, { payload }) => {
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
  },
});
export const { onGetUserRoleModuleAccess,
  onGetUserRoleModuleAccessSuccess,
  onGetUserRoleModuleAccessError,
  onGetUserRoleModuleAccessReset,
  onPostUserRoleModuleAccess, 
  onPostUserRoleModuleAccessReset,
  onPostUserRoleModuleAccessSuccess, 
  onPostUserRoleModuleAccessError,
  onUpdateUserRoleModuleAccess,
  onUpdateUserRoleModuleAccessSuccess,
  onUpdateUserRoleModuleAccessError
 } = userRoleModuleAccessSlice.actions;

export default userRoleModuleAccessSlice.reducer;
