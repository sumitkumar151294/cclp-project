import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callDealGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.deal);
  return data;
};
export const callDealPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.deal, payload);
  return data;
};
export const callDealUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.deal, payload);
  return data;
};