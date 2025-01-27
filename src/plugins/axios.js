import axios from "axios";
import { useAuthStore } from "@/stores/auth.js";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        const authStore = useAuthStore();
        config.headers = {
            'Authorization': `Bearer ${authStore.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'author': 'Md. Ashik Ahmed'
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use((response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            const authStore = useAuthStore();
            authStore.$reset();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;