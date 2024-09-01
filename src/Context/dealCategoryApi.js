import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callDealCategoryGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.dealCategory,{
    params: {
        clientId: 6,
    },
});
  return data;
};
export const callDealCategoryPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.dealCategory, payload);
  return data;
};
export const callDealCategoryUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.dealCategory, payload);
  return data;
};