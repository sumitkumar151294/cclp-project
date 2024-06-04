import { createSlice } from "@reduxjs/toolkit";

export const moduleSlice = createSlice({
  name: "module",
  initialState: {
    apiCalled:false,
    isLoading: false,
    isError: false,
    data:[],
    error: [],
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
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data,
        message,
        status_code,
        error: [],
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
        error: [],
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
        error: [],
      };
    }
  },
});
export const {onGetModule, onGetModuleSuccess, onGetModuleError , allowModules,onGetModuleReset, resetAllowModules } =
moduleSlice.actions;

export default moduleSlice.reducer;
