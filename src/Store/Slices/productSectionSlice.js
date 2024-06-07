import { createSlice } from "@reduxjs/toolkit";

export const productSectionSlice = createSlice({
  name: "offerMaster",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    message: ""
  },
  reducers: {
    onGetProductSection: (state) => {
        return {
          ...state,
          isLoading: true,
          isError: false,
          getData: [],
          message: "",
        };
      },  
    onGetProductSectionSuccess: (state, { payload }) => {
        const { getData = [], message = "", status_code  } = payload;
        return {
            ...state,
            isLoading: false,
            isError: false,
            getData:getData,
            message,
            status_code,
        };
    },  
    onGetProductSectionError: (state, { payload }) => {
        const { getData = [], message = "", status_code = 400 } = payload;
        return {
           ...state,
           getData:getData,
           message,
           status_code,
           isLoading: false,
           isError: true,
        };
    },
    onPostProductSetionSubmit: (state) => {
        return {
            ...state,
            isLoading: true,
            isError: false,
         };
    },
    onPostProductSectionSuccess: (state, { payload }) => {
        const { data, message, status_code } = payload;
        return {
          ...state,
          data:data,
          isLoading: false,
          isError: false,
          status_code,
          message,
        };
    },
    onPostProductSectionError: (state, { payload }) => {
        const { message, status_code = 400 } = payload;
        return {
          ...state,
          status_code,
          isLoading: false,
          isError: true,
          message,
        };
    },
    onPostProductSectionReset: (state) => {
      return {
        ...state,
        data: [],
        message: "",
        status_code: null,
      };
    },
  },
});

export const {
  onGetProductSection,onGetProductSectionSuccess,onGetProductSectionError,onPostProductSetionSubmit,onPostProductSectionSuccess,onPostProductSectionError,onPostProductSectionReset
} = productSectionSlice.actions;

export default productSectionSlice.reducer;
