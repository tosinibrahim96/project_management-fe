import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

const getAll = async () => {
  try {
    const response = await axios.get(`${baseUrl}/projects`);
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
};

const getOne = async (projectId) => {
  try {
    const response = await axios.get(`${baseUrl}/projects/${projectId}`);
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
};

export { getAll, getOne };
