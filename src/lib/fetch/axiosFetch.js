// axios
import axios from "axios";

export default (config) => {
  const axiosConfig = Object.assign(config, {});
  return axios(axiosConfig);
};
