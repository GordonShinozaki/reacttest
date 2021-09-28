import axios from "axios";
const baseUrl = "/api/phonebook";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (nameObject) => {
  return axios.post(baseUrl, nameObject);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, nameObject) => {
  return axios.put(`${baseUrl}/${id}`, nameObject);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update };
