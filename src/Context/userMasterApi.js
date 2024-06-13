import axiosInstance from '../Common/Axios/axiosInstance';
import API from '../Common/Endpoint/serviceConstrants';
export const callUserMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.userMaster, payload);
  return data;
};
export const callUserMasterGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getUserMaster);
  return data;
};