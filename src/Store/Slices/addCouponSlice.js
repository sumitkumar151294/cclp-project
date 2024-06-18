import { createSlice } from "@reduxjs/toolkit";

export const addCouponSlice = createSlice({
  name: "addCoupon",
  initialState: {
    isLoading: false,
    isError: false,
    status_code:"",
    data: [],
    message: ""
  },
  reducers: {
    onAddCouponSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    },

    onAddCouponSubmitSuccess: (state, { payload }) => {
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

    onAddCouponSubmitError: (state, { payload }) => {
      const { message, status_code = 400 } = payload;
      return {
        ...state,
        status_code,
        isLoading: false,
        isError: true,
        message,
      };
    }
  }
});
export const {onAddCouponSubmit,onAddCouponSubmitSuccess,onAddCouponSubmitError
} = addCouponSlice.actions;

export default addCouponSlice.reducer;
