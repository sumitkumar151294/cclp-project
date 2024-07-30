import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callsectionMasterGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.getsectionMaster);
  return data;
};
export const callsectionMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.postsectionMaster, payload);
  return data;
};
export const callsectionMasterUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.updatesectionMaster, payload);
  return data;
};