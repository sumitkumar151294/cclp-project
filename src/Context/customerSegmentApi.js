import axiosInstance from '../Common/Axios/axiosInstance';
import API from '../Common/Endpoint/serviceConstrants';
export const callCustomerSegApi = async () => {
  const { data = {} } = await axiosInstance.get(API.customerSegment);
  return data;
};
