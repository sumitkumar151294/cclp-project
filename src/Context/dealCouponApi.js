import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callDealCouponGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.dealCoupon);
  return data;
};
export const callDealCouponPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.dealCoupon, payload);
  return data;
};
export const callDealCouponUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.dealCoupon, payload);
  return data;
};