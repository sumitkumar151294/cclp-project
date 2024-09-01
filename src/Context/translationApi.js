import axiosInstanceAdmin from '../Common/Axios/axiosInstanceAdmin';
import API from '../Common/Endpoint/serviceConstrants';

export const translationApi = async (payload) => {
    const { data = {} } = await axiosInstanceAdmin.get(API.translationApi, {
        params: {
            clientId: payload?.clientId,
        },
    });
    return data;
};