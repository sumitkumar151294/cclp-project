import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callUserRoleModuleAccessGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.getUserRoleModuleAccessbyclientId,{
    params: {
        clientId: 6,
    },
});
  return data;
};
export const callUserRoleModuleAccessPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.postUserRoleModuleAccess, payload);
  return data;
};
