import axiosInstanceAdmin from '../Common/Axios/axiosInstanceAdmin';
import API from '../Common/Endpoint/serviceConstrants';
export const callClientMasterGetApi = async (payload) => {
  const { platformDomainUrlAdmin } = payload;
  const params = { platformDomainUrlAdmin };
  const { data = {} } = await axiosInstanceAdmin.get(API.clientmaster,{ params });
  return data;
};