import axiosInstanceAdmin from '../Common/Axios/axiosInstanceAdmin';
import API from '../Common/Endpoint/serviceConstrants';

export const callClientMasterGetApi = async (payload) => {

  const { data = {} } = await axiosInstanceAdmin.get(API.clientmaster, {
    params: {
      PlatformDomainUrl: payload?.PlatformDomainUrl,
    },
  });
  return data;
};