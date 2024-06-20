import axiosInstance from '../Common/Axios/axiosInstance';
import API from '../Common/Endpoint/serviceConstrants';
export const callUserRoleModuleAccessPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.userRole_moduleAccess, payload);
  return data;
};
