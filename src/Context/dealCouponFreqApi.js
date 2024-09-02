import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callDealCouponFreqGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.dealcouponfrequency);
  return data;
};
export const callDealCouponFreqPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.dealcouponfrequency, payload);
  return data;
};
export const callDealCouponFreqUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.dealcouponfrequency, payload);
  return data;
};