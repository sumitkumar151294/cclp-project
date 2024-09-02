import API from "../Common/Endpoint/serviceConstrants";
import axiosInstanceClient from "../Common/Axios/axiosInstanceClient";

export const callModuleApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.moduleApi);
  return data;
};
export const callPostModuleApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.moduleApi,payload);
  return data;
};
