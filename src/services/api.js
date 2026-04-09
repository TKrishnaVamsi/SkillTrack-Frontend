import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    // backend uses simple auth, no JWT token needed currently
  }
  return req;
});

export default API;
