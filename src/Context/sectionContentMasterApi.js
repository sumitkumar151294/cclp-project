import axiosClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const callSectionContentMasterGetApi = async () => {
  const { data = {} } = await axiosClient.get(API.sectionContentMaster,{
    params: {
        clientId: 6,
    },
});
  return data;
};
export const callSectionContentMasterPostApi = async (payload) => {
  const { data = {} } = await axiosClient.post(API.sectionContentMaster, payload);
  return data;
};
export const callSectionContentMasterUpdateApi = async (payload) => {
  const { data = {} } = await axiosClient.post(API.sectionContentMaster, payload);
  return data;
};