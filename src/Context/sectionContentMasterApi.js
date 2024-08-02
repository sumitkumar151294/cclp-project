import axiosClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callSectionContentMasterGetApi = async () => {
  const { data = {} } = await axiosClient.get(API.getSectionContentMaster);
  return data;
};
export const callSectionContentMasterPostApi = async (payload) => {
  const { data = {} } = await axiosClient.post(API.postSectionContentMaster, payload);
  return data;
};
export const callSectionContentMasterUpdateApi = async (payload) => {
  const { data = {} } = await axiosClient.post(API.updateSectionContentMaster, payload);
  return data;
};