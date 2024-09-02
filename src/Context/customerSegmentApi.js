import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callCustomerSegmentGetApi = async () => {
  const { data = [] } = await axiosInstanceClient.get(API.customersegment,{
    headers: {
      'clientId': '6423fa90a02487f679aa4898',

    }
  });
  return data;
};