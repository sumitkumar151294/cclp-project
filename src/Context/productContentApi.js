import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callProductContentGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.productcontent);
  return data;
};