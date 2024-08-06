import axiosInstanceAdmin from '../Common/Axios/axiosInstanceAdmin';
import API from '../Common/Endpoint/serviceConstrants';
export const translationApi = async () => {
    const { data = {} } = await axiosInstanceAdmin.get(API.translationApi);
    return data;
};
