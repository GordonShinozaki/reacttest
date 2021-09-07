import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (nameObject) => {
  return axios.post(baseUrl, nameObject);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove };
