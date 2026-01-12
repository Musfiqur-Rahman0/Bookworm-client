import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // or process.env.REACT_APP_API_BASE_URL for CRA
  withCredentials: true, // sends httpOnly cookies automatically
});

export default API;
