import axiosInstance from '../Common/Axios/axiosInstance'
export const callModuleApi = async () => {
  const { data = {} } = await axiosInstance.get();
  return data;
};
