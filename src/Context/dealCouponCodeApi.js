import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callDealCouponCodeGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.dealCouponCode,{
    params: {
        clientId: 6,
    },
});
  return data;
};
export const callDealCouponCodePostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.dealCouponCode, payload);
  return data;
};
export const callDealCouponCodeUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.dealCouponCode, payload);
  return data;
};