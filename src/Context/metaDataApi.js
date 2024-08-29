import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callMetaDataGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.metadata);
  return data;
};
export const callMetaDataPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.metadata, payload);
  return data;
};