import { createSlice } from "@reduxjs/toolkit";

export const sectionContentMasterSlice = createSlice({
  name: "section-content-master",
  initialState: {
    isLoading: false,
    isError: false,
    sectionContentMasterData: [],
    message: "",
  },
  reducers: {
    onGetSectionContentMaster: (state) => {
      return {
        ...state,
        isgetLoading: true,
        getSectionContentMasterData: [],
        getmessage: "",
      };
    },

    onGetSectionContentMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isgetLoading: false,
        getSectionContentMasterData: data,
        getmessage:message,
        get_status_code:status_code,
      };
    },

    onGetSectionContentMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getSectionContentMasterData: data,
        getmessage:message,
        get_status_code:status_code,
        isgetLoading: false,
      };
    },

    onPostSectionContentMaster: (state) => {
      return {
        ...state,
        isPostLoading: true,
        postSectionContentMasterData: [],
      };
    },

    onPostSectionContentMasterSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code="201" } = payload;
      return {
        ...state,
        isPostLoading: false,
        postSectionContentMasterData: postData,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPostSectionContentMasterError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postSectionContentMasterData: postData,
        postMessage:message,
        post_status_code:status_code,
        isPostLoading: false,
      };
    },
    onPostSectionContentMasterReset: (state) => {
      return {
        ...state,
        postSectionContentMasterData: [],
        postMessage:"",
        post_status_code:null
      };
    },

    onUpdateSectionContentMaster: (state) => {
      return {
        ...state,
        isUpdateLoading: true,
        updateSectionContentMasterData: [],
        updateMessage: "",
      };
    },

    onUpdateSectionContentMasterSuccess: (state, { payload }) => {
      const {data=[], message = "", status_code = "201" } = payload;
      return {
        ...state,
        isUpdateLoading: false,
        updateSectionContentMasterData:data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdateSectionContentMasterError: (state, { payload }) => {
      const {data=[], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateSectionContentMasterData:data,
        updateMessage:message,
        update_status_code:status_code,
        isUpdateLoading: false,
      };
    },
    onUpdateSectionContentMasterReset: (state) => {
      return {
        ...state,
        updateMessage:"",
        updateSectionContentMasterData:[],
        update_status_code:null,
      };
    },
  },
});

export const {
  onGetSectionContentMaster,
  onGetSectionContentMasterSuccess,
  onGetSectionContentMasterError,
  onPostSectionContentMaster,
  onPostSectionContentMasterSuccess,
  onPostSectionContentMasterError,
  onUpdateSectionContentMaster,
  onUpdateSectionContentMasterSuccess,
  onUpdateSectionContentMasterError,
  onUpdateSectionContentMasterReset,
  onPostSectionContentMasterReset
} = sectionContentMasterSlice.actions;

export default sectionContentMasterSlice.reducer;

