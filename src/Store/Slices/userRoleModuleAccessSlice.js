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
export const { 
  onPostUserRoleModuleAccess, 
  onPostUserRoleModuleAccessReset,
  onPostUserRoleModuleAccessSuccess, 
  onPostUserRoleModuleAccessError
 } = userRoleModuleAccessSlice.actions;

export default userRoleModuleAccessSlice.reducer;
