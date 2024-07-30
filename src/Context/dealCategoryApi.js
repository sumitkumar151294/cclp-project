import axiosInstance from '../Common/Axios/axiosInstance';
import API from '../Common/Endpoint/serviceConstrants';
export const callDealCategoryGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getdealcategory);
  return data;
};
export const callDealCategoryPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postdealcategory, payload);
  return data;
};
export const callDealCategoryUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.updatedealcategory, payload);
  return data;
};