import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callUserMasterApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.userMaster, payload);
  return data;
};
export const callUserMasterGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.userMaster);
  return data;
};
export const callUserMasterUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.userMaster, payload);
  return data;
};