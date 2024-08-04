import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callDealCouponGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.getdealcoupon);
  return data;
};
export const callDealCouponPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.postdealcoupon, payload);
  return data;
};
export const callDealCouponUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.updatedealcoupon, payload);
  return data;
};