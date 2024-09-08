import { createSlice } from "@reduxjs/toolkit";

export const uploadImageSlice = createSlice({
  name: "upload-image",
  initialState: {
    isLoading: false,
    isError: false,
    isPostLoading: false,
    uploadImageData: [],
    message: "",
    isgetLoading: true,
  },
  reducers: {
    onPostuploadImage: (state) => {
      return {
        ...state,
        isPostLoading: true,
        postuploadImageData: [],
      };
    },

    onPostuploadImageSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code = "200" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postuploadImageData: postData,
        postMessage: message,
        post_status_code: status_code,
      };
    },

    onPostuploadImageError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postuploadImageData: postData,
        postMessage: message,
        post_status_code: status_code,
        isPostLoading: false,
      };
    },
    onPostuploadImageReset: (state) => {
      return {
        ...state,
        postuploadImageData: [],
        postMessage: "",
        post_status_code: null,
      };
    },
    onPostuploadMobileImage: (state) => {
      return {
        ...state,
        isPostLoading: true,
        postuploadMobileImageData: [],
      };
    },
    onPostuploadElementImage: (state) => {
      return {
        ...state,
        isPostLoading: true,
        postuploadElementImageData: [],
      };
    },

    onPostuploadMobileImageSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code = "200" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postuploadMobileImageData: postData,
        postMessage: message,
        postMobileStatusCode: status_code,
      };
    },
    onPostuploadElementImageSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code = "200" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postuploadElementImageData: postData,
        postElementMessage: message,
        postElementStatusCode: status_code,
      };
    },

    onPostuploadMobileImageError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postuploadMobileImageData: postData,
        postMessage: message,
        postMobileStatusCode: status_code,
        isPostLoading: false,
      };
    },
    onPostuploadElementImageError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postuploadElementImageData: postData,
        postElementMessage: message,
        postElementStatusCode: status_code,
        isPostLoading: false,
      };
    },
    onPostuploadMobileImageReset: (state) => {
      return {
        ...state,
        postuploadMobileImageData: [],
        postMessage: "",
        postMobileStatusCode: null,
        isPostLoading:false
      };
    },
    onPostuploadElementImageReset: (state) => {
      return {
        ...state,
        postuploadElementImageData: [],
        postElementMessage: "",
        postElementStatusCode: null,
      };
    },
  },
});

export const {
  onPostuploadMobileImage,
  onPostuploadMobileImageSuccess,
  onPostuploadMobileImageError,
  onPostuploadMobileImageReset,
  onPostuploadImage,
  onPostuploadImageSuccess,
  onPostuploadImageError,
  onPostuploadImageReset,
  onPostuploadElementImage,
  onPostuploadElementImageReset,
  onPostuploadElementImageSuccess,
  onPostuploadElementImageError,
} = uploadImageSlice.actions;

export default uploadImageSlice.reducer;
