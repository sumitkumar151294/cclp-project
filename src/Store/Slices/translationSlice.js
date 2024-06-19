import { createSlice } from "@reduxjs/toolkit";

export const translationSlice = createSlice({
  name: "translation",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    message: "",
  },
  reducers: {
    onTranslationSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        message: "",
      };
    },

    onTranslationSubmitSuccess: (state, { payload }) => {
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

    onTranslationSubmitError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        data:data,
        message,
        status_code,
        isLoading: false,
        isError: true,
      };
    },
    onTranslationReset: (state) => {
      return {
        ...state,
        message:"",
        status_code:null,
        isLoading: false,
        isError: false,
      };
    }
  },
});
export const {
  onTranslationSubmit,
  onTranslationSubmitError,
  onTranslationSubmitSuccess,
  onTranslationReset
} = translationSlice.actions;

export default translationSlice.reducer;