import { createSlice } from "@reduxjs/toolkit";

export const customerSegementSlice = createSlice({
  name: "customerSegement",
  initialState: {
    isLoading: false,
    isError: false,
    data:[],
    message: "",
  },
  reducers: {
    onGetCustomerSegement: (state) => {
      debugger
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        message: "",
      };
    },

    onGetCustomerSegementSuccess: (state, { payload }) => {
      debugger
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

    onGetCustomerSegementError: (state, { payload }) => {
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
    onGetCustomerSegementReset: (state) => {
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
export const {onGetCustomerSegement,onGetCustomerSegementSuccess,onGetCustomerSegementError,onGetCustomerSegementReset } =
customerSegementSlice.actions;

export default customerSegementSlice.reducer;
