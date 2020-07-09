import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

const save = async (newTask) => {
  const response = await axios.post(`${baseUrl}/tasks`, newTask);
  return response.data;
};

export { save };
