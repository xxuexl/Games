//axios.js -----> src/utils/axios.js
import axios from "axios";

export const axiosUtil = async (options) => {
  return await axios.request(options).then((res) => res.data);
};
