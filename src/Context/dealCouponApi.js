import axiosInstance from '../Common/Axios/axiosInstance';
import API from '../Common/Endpoint/serviceConstrants';
export const callDealCouponGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getdealcoupon);
  return data;
};
export const callDealCouponPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postdealcoupon, payload);
  return data;
};
export const callDealCouponUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.updatedealcoupon, payload);
  return data;
};