import { createSlice } from "@reduxjs/toolkit";

export const customerSegmentSlice = createSlice({
  name: "customer-segment",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    message: "",
  },
  reducers: {
    onGetCustomerSegment: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        message: "",
      };
    },

    onGetCustomerSegmentSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data:data,
        message,
        status_code,
      };
    },

    onGetCustomerSegmentError: (state, { payload }) => {
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
    onGetCustomerSegmentReset: (state) => {
      return {
        ...state,
        data: null,
        message: null,
        status_code: null,
        isLoading: false,
        isError: true,
      };
    },
  },
});
export const {
  onGetCustomerSegment,
  onGetCustomerSegmentSuccess,
  onGetCustomerSegmentError,
  onGetCustomerSegmentReset,
} = customerSegmentSlice.actions;

export default customerSegmentSlice.reducer;