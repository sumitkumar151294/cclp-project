import { createSlice } from "@reduxjs/toolkit";

export const moduleSlice = createSlice({
  name: "module",
  initialState: {
    isLoading: false,
    isError: false,
    data:[],
    message: "",
    filteredData: [],
  },
  reducers: {
    allowModules:(state , { payload }) => {
      return{
        ...state,
        filteredData: payload,
        apiCalled:true,
      }
    }, 
    resetAllowModules:(state ) => {
      return{
        ...state,
        filteredData: []
      }
    }, 
    onGetModule: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        message: "",
      };
    },

    onGetModuleSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code  } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data,
        message,
        status_code,
      };
    },

    onGetModuleError: (state, { payload }) => {
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
    onGetModuleReset: (state) => {
      return {
        ...state,
        data:null,
        message:null,
        status_code:null,
        isLoading: false,
        isError: true,
      };
    },
    onPostModule: (state) => {
      return {
        ...state,
        postLoading: true,
        isError: false,
        postRoleData: [], 
      };
    },

    onPostModuleSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code="201" } = payload;
      return {
        ...state,
        postLoading: false,
        isError: false,
        postRoleData: postData,
        message,
        status_code,
      };
    },

    onPostModuleError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postRoleData: postData, 
        message,
        status_code,
        postLoading: false,
        isError: true,
      };
    },
    onPostModuleReset: (state) => {
      return {
        ...state,
        postRoleData: [], 
        message:"",
        status_code:null,
        postLoading: false,
        isError: false,
      };
    },

  },
});
export const {allowModules, resetAllowModules,onGetModule, onGetModuleSuccess, onGetModuleError ,onGetModuleReset,onPostModule,onPostModuleSuccess,onPostModuleError,onPostModuleReset } =
moduleSlice.actions;

export default moduleSlice.reducer;
