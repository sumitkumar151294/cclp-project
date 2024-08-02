import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callDealGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.getdeal);
  return data;
};
export const callDealPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.postdeal, payload);
  return data;
};
export const callDealUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.updatedeal, payload);
  return data;
};