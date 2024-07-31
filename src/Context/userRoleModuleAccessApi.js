import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callUserRoleModuleAccessGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.getUserRoleModuleAccess);
  return data;
};
export const callUserRoleModuleAccessPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.postUserRoleModuleAccess, payload);
  return data;
};
export const callUserRoleModuleAccessUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.put(API.postUserRoleModuleAccess, payload);
  return data;
};
