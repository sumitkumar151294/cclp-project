import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callNavConfigureGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.gettnavconfiguration);
  return data;
};
export const callNavConfigurePostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.postnavconfiguration, payload);
  return data;
};