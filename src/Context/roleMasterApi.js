import axiosInstance from '../Common/Axios/axiosInstance';
import API from '../Common/Endpoint/serviceConstrants';
export const callUserRoleGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getRoleMaster);
  return data;
};
export const callUserRolePostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postRoleMaster, payload);
  return data;
};
