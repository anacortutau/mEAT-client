import axios from "axios";

//organize the calls to th backend

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
});

// do magic code where the token will be sent to th backend
service.interceptors.request.use((config) => {
  //look for the token in localStorage
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    config.headers = { authorization: `Bearer ${authToken}` };
  }

  return config;
});

export default service;
