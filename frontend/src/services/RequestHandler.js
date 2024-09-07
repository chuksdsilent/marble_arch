import axios from "axios";

const BASE_URL = process.env.REACT_APP_DEV_BASE_URL;
const PHOTO_URL = process.env.REACT_APP_PHOTO_URL;

console.log("url is ", BASE_URL)
const post = (path, data) => {
  
  const new_url = `${BASE_URL}${path}`;
  // const new_url = `${path}`;
  return axios.post(new_url, data || {});
};

/**
 *
 * @param {string} path
 * @returns {Observable<any>}
 */
const get = path => {
  const new_url = `${BASE_URL}${path}`;
  return axios.get(new_url || {}, {
    withCredentials: true,
    credentials: "include",
  });
};

/**
 *
 * @param {string} path
 * @param data
 * @returns {Observable<any>}
 */
const put = (path, id, data) => {
  const new_url = `${BASE_URL}${path}/${id}`;
  return axios.put(new_url, data);
};

const single = (path, id) => {
  const new_url = `${BASE_URL}${path}/${id}`;
  return axios.get(new_url);
};

const today = path => {
  const new_url = `${BASE_URL}${path}?query=today`;
  return axios.get(new_url);
};

const getWithQuery = (path, query) => {
  const new_url = `${BASE_URL}${path}?${query}`;
  return axios.get(new_url);
};

/**
 *
 * @param path
 * @param data
 */
const deletes = (path, id) => {
  const new_url = `${BASE_URL}${path}/${id}`;
  // const url = `${path}`;
  return axios.delete(new_url);
};

/**
 *
 * @param {string} path
 * @returns {Observable<any>}
 */
const getAll = path => {
  const new_url = `${BASE_URL}${path}`;
  return axios.get(new_url);
};

/**
 *
 * @param {string} path
 * @returns {Observable<any>}
 */
const photo = path => {
  const new_url = `${BASE_URL}${PHOTO_URL}${path}`;
  return new_url;
};

const publish = (path, id, data) => {
  const new_url = `${BASE_URL}${path}/${id}`;
  return axios.patch(new_url, data);
};

const RequestHandler = {
  getWithQuery,
  today,
  post,
  get,
  getAll,
  publish,
  deletes,
  single,
  put,
  photo,
};
export default RequestHandler;
