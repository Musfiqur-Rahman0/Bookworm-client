import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // or process.env.REACT_APP_API_BASE_URL for CRA
  withCredentials: true, // sends httpOnly cookies automatically
});

export default API;

let accessToken : string | null = null;

export const setAccessToken = (token : string | null) => {
    accessToken = token; 
}

API.interceptors.response.use((res)=> res, async(error) => {
    const originalRequest = error.config;
    if(error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const res = await API.post("/refresh");
            const newToken = res?.data?.accessToken;

            setAccessToken(newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return API(originalRequest)
        } catch (error) {
            setAccessToken(null);
            window.location.href= "/login"
        }
    }
    return Promise.reject(error);
}
)








