import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

const save = async (newProject) => {
  try {
    const response = await axios.post(`${baseUrl}/tasks`, newProject);
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
};

export { save };
