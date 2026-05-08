import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:3000",
//   headers: {
//     "Content-Type": "application/json",
//   }
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     console.error("Request Error:", error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     console.error("Response Error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default api;