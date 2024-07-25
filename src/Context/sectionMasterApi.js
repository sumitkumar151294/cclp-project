import axiosInstance from '../Common/Axios/axiosInstance';
import API from '../Common/Endpoint/serviceConstrants';
export const callsectionMasterGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getsectionMaster);
  return data;
};
export const callsectionMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postsectionMaster, payload);
  return data;
};
export const callsectionMasterUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.updatesectionMaster, payload);
  return data;
};