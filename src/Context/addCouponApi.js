import axiosInstance from "../Common/Axios/axiosInstance"; // Assuming Axios is imported here
import API from "../Common/Endpoint/serviceConstrants";

export const callCouponApi = async (payload) => {
  const {data={}}  = await axiosInstance.post(API.addCoupon, payload);
  return data;
};