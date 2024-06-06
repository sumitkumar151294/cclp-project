import axiosInstance from '../Common/Axios/axiosInstance';
import API from '../Common/Endpoint/serviceConstrants';
export const callProductContentApi = async () => {
  const { data = {} } = await axiosInstance.get(API.productContent);
  return data;
};
