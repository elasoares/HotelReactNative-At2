import Axios from "axios";

export const axios = Axios.create({
  baseURL: "https://projeto-drn-default-rtdb.firebaseio.com",
});

axios.interceptors.request.use((config) => {
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
