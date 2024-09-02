import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callsectionMasterGetApi = async () => {
  const { data = {} } = await axiosInstanceClient.get(API.sectionMaster);
  return data;
};
export const callsectionMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.sectionMaster, payload);
  return data;
};
export const callsectionMasterUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstanceClient.post(API.sectionMaster, payload);
  return data;
};