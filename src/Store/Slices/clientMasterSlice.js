import { createSlice } from "@reduxjs/toolkit";

export const clientMasterSlice = createSlice({
  name: "client-master",
  initialState: {
    isLoading: false,
    isError: false,
    clientMasterData: [],
    message: "",
    isgetLoading: true,
  },
  reducers: {
    onGetClientMaster: (state) => {
      return {
        ...state,
        isgetLoading: true,
        clientMasterData: [],
        getmessage: "",
      };
    },

    onGetClientMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isgetLoading: false,
        clientMasterData: data,
        getmessage:message,
        get_status_code:status_code,
      };
    },

    onGetClientMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        clientMasterData: data,
        getmessage:message,
        get_status_code:status_code,
        isgetLoading: false,
      };
    },
    onGetClientMasterReset: (state) => {

      return {
        ...state,
        get_status_code:null,
        isgetLoading: false,
      };
    },
  },
});

export const {
  onGetClientMaster,
  onGetClientMasterSuccess,
  onGetClientMasterError,
  onGetClientMasterReset
} = clientMasterSlice.actions;

export default clientMasterSlice.reducer;
