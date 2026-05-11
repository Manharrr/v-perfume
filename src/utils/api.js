import axios from "axios";

// Create Axios instance pointing to the Django backend
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized (Token Expiry)
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token. 
        // In a real app, this might rely on an httpOnly cookie, so we wouldn't need to pass a payload.
        // For simulation, we might pass a stored refresh token.
        const refreshToken = localStorage.getItem("refreshToken");
        
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Call the refresh endpoint (this requires backend support)
        const response = await axios.post("http://127.0.0.1:8000/api/users/refresh/", {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        // Update the failed request with the new token and retry
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);

      } catch (refreshError) {
        console.error("Token refresh failed. Logging out.", refreshError);
        // Clean up and force re-login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
