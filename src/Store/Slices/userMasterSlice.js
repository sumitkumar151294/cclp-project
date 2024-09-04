import { createSlice } from "@reduxjs/toolkit";

export const userMasterSlice = createSlice({
  name: "user-master",
  initialState: {
    isLoading: false,
    isError: false,
    userMasterData: [],
    message: "",
    isgetLoading: true,
  },
  reducers: {
    onGetuserMaster: (state) => {
      return {
        ...state,
        isgetLoading: true,
        getuserMasterData: [],
        getmessage: "",
      };
    },

    onGetuserMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isgetLoading: false,
        getuserMasterData: data,
        getmessage: message,
        get_status_code: status_code,
      };
    },

    onGetuserMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getuserMasterData: data,
        getmessage: message,
        get_status_code: status_code,
        isgetLoading: false,
      };
    },

    onPostuserMaster: (state) => {
      return {
        ...state,
        isPostLoading: true,
        postuserMasterData: [],
      };
    },

    onPostuserMasterSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code = "200" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postuserMasterData: postData,
        postMessage: message,
        post_status_code: status_code,
      };
    },

    onPostuserMasterError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postuserMasterData: postData,
        postMessage: message,
        post_status_code: status_code,
        isPostLoading: false,
      };
    },
    onPostuserMasterReset: (state) => {
      return {
        ...state,
        postuserMasterData: [],
        postMessage: "",
        post_status_code: null,
      };
    }
  },
});

export const {
  onPostuserMasterReset,
  onPostuserMasterSuccess,
  onGetuserMaster,
  onGetuserMasterError,
  onGetuserMasterSuccess,
  onPostuserMaster,
  onPostuserMasterError,
} = userMasterSlice.actions;

export default userMasterSlice.reducer;
