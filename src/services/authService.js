import api from "../utils/api";

// Helper to decode JWT payload safely
export const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT", e);
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

export const authService = {
  login: async (email, password) => {
    try {
      // The correct Django login URL based on your main urls.py
      const response = await api.post("/api/users/login/", { email, password });
      
      const { access, refresh } = response;
      
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Fetch the full user details using the newly set token
      const userResponse = await api.get("/api/users/me/");
      return userResponse;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || isTokenExpired(token)) return null;
    try {
      const userResponse = await api.get("/api/users/me/");
      return userResponse;
    } catch (error) {
      return null;
    }
  }
};

export default authService;
