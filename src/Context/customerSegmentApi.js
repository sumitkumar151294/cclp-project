import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callCustomerSegmentGetApi = async () => {
  const { data = [] } = await axiosInstanceClient.get(API.customersegment);
  return data;
};