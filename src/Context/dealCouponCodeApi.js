import axiosInstance from '../Common/Axios/axiosInstance';
import API from '../Common/Endpoint/serviceConstrants';
export const callDealCouponCodeGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.dealCouponCode);
  return data;
};
export const callDealCouponCodePostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.dealCouponCode, payload);
  return data;
};
export const callDealCouponCodeUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.dealCouponCode, payload);
  return data;
};