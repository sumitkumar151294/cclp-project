import axiosInstance from '../Common/Axios/axiosInstance';
import API from '../Common/Endpoint/serviceConstrants';
export const translationApi = async () => {
    const { data = {} } = await axiosInstance.get(API.translationApi);
    return data;  
};
