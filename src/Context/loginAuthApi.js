import axiosInstanceAdmin from "../Common/Axios/axiosInstanceAdmin";
import API from "../Common/Endpoint/serviceConstrants";
export const loginAuthApi = async (payload) => {
    const { data = {} } = await axiosInstanceAdmin.post(API.loginAuth, payload,{
      headers: {
        'UserId': 'TestUser',
        'Password': 'Password1'
      }
    });
  return data;
};

