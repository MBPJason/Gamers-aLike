import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

let authToken;

export const setAxiosDefaults = (token) => {
  authToken = token;
};

// instance.defaults.headers.common["Authorization"] = "Bearer " + authToken;

export default instance;
