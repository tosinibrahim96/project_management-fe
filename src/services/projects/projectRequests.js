import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/projects`);
  return response.data;
};

const getOne = async (projectId) => {
  const response = await axios.get(`${baseUrl}/projects/${projectId}`);
  return response.data;
};

const save = async (projectData) => {
  const response = await axios.post(`${baseUrl}/projects/`, projectData);
  return response.data;
};

export { getAll, getOne, save };
