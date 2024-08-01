import axiosInstanceClient from '../Common/Axios/axiosInstanceClient';
import API from '../Common/Endpoint/serviceConstrants';
export const calluploadApi = async (payload) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data = {} } = await axiosInstanceClient.post(
      API.uploadImage,
      payload,
      config
    );
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};