import { createSlice } from "@reduxjs/toolkit";

export const productContentSlice = createSlice({
  name: "productContent",
  initialState: {
    isLoading: false,
    isError: false,
    data:[],
    message: "",
  },
  reducers: {
    onGetProductContent: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        message: "",
      };
    },

    onGetProductContentSuccess: (state, { payload }) => {
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

    onGetProductContentError: (state, { payload }) => {
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
    onGetProductContentReset: (state) => {
      return {
        ...state,
        data:null,
        message:null,
        status_code:null,
        isLoading: false,
        isError: true,
      };
    }
  },
});
export const {onGetProductContent,onGetProductContentSuccess,onGetProductContentError,onGetProductContentReset } =
productContentSlice.actions;

export default productContentSlice.reducer;
