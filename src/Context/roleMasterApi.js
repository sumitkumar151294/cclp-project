import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callUserRoleGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.getRoleMaster);
  return data;
};
export const callUserRolePostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.postRoleMaster, payload);
  return data;
};
