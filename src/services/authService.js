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

// Fallback logic for json-server without auth plugin
const simulateLogin = async (email, password) => {
  console.warn("Using simulated login fallback since backend /api/auth/login failed.");
  
  // Try admins first
  const adminRes = await api.get(`/admins?email=${email}`);
  if (adminRes.length > 0 && adminRes[0].password === password) {
    const admin = adminRes[0];
    const token = createMockToken({ id: admin.id, role: "admin", email: admin.email });
    return { access: token, refresh: "mock_refresh_token", user: { id: admin.id, email: admin.email, role: "admin" } };
  }

  // Try users next
  const userRes = await api.get(`/users?email=${email}`);
  if (userRes.length > 0 && userRes[0].password === password) {
    const user = userRes[0];
    if (user.status === "blocked") {
      throw new Error("Account is blocked.");
    }
    const token = createMockToken({ id: user.id, role: "user", email: user.email });
    return { access: token, refresh: "mock_refresh_token", user: { id: user.id, email: user.email, role: "user" } };
  }

  throw new Error("Invalid email or password");
};

const createMockToken = (payload) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const expPayload = { ...payload, exp: Math.floor(Date.now() / 1000) + 3600 }; // 1hr expiry
  const body = btoa(JSON.stringify(expPayload));
  return `${header}.${body}.mock_signature`;
};

export const authService = {
  login: async (email, password) => {
    try {
      // The correct Django login URL based on your main urls.py
      const response = await api.post("/api/users/login/", { email, password });
      
      const { access, refresh, user } = response; // api interceptor returns response.data
      
      // Store minimal data: access and refresh tokens
      localStorage.setItem("accessToken", access);
      
      // The prompt specified simulating httpOnly cookie for refresh token if needed.
      // We store it in localStorage here to simulate that behavior for the Axios interceptor.
      localStorage.setItem("refreshToken", refresh);

      return user;
    } catch (error) {
      // If the real endpoint 404s (e.g. standard json-server), fallback to simulation
      if (error.response && error.response.status === 404) {
        const { access, refresh, user } = await simulateLogin(email, password);
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        return user;
      }
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

  getCurrentUser: () => {
    const token = localStorage.getItem("accessToken");
    if (!token || isTokenExpired(token)) return null;
    return decodeJWT(token);
  }
};

export default authService;
