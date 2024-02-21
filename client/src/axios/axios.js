/** @format */

import axios from "axios";

export const axiosInstance = () => {
  const token = localStorage.getItem("user");
  return axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Authorization: token,
    },
  });
};

export const axiosInstanceSSR = () => {
  return axios.create({
    baseURL: "http://localhost:8000",
  });
};
