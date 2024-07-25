import axiosInstance from '../Common/Axios/axiosInstance';
import API from '../Common/Endpoint/serviceConstrants';
export const callSectionContentMasterGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getSectionContentMaster);
  return data;
};
export const callSectionContentMasterPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postSectionContentMaster, payload);
  return data;
};
export const callSectionContentMasterUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.updateSectionContentMaster, payload);
  return data;
};