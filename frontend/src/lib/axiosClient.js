import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    // withCredentials: true,
    // withXSRFToken: true,
});



axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("TOKEN");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized!");
            localStorage.removeItem("TOKEN");
        }
        return Promise.reject(error);
    },
);

export default axiosClient;
