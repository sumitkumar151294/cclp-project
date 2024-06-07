import axiosInstance from "../Common/Axios/axiosInstance"; // Assuming Axios is imported here
import API from "../Common/Endpoint/serviceConstrants";

export const callPostProductApi = async (payload) => {
  const {data={}}  = await axiosInstance.post(API.postproductApi, payload);
  return data;
};

export const callGetProductApi = async () => {
  const {data={}}  = await axiosInstance.get(API.getProductApi);
  return data;
};