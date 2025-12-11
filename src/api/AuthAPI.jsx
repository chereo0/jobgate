import axios from "axios";

const API_URL = "http://localhost:5000/api/users";
const CATEGORY_API_URL = "http://localhost:5000/api/categories";

// Register user
export const RegisterAPI = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("userRole", response.data.role);
      localStorage.setItem("userId", response.data.userID);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login user
export const LoginAPI = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("userRole", response.data.role);
      localStorage.setItem("userId", response.data.userID);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout user
export const LogoutAPI = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
  return { success: true, message: "Logged out successfully" };
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all users (admin only)
export const getAllUsersAPI = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get user by ID (admin only)
export const getUserById = async (userId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update user (admin only)
export const updateUserById = async (userId, userData) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(`${API_URL}/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete user (admin only)
export const deleteUserById = async (userId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.delete(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all companies (admin only)
export const getAllCompanies = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${API_URL}/companies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

// Get user role
export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

// Get user email
export const getUserEmail = () => {
  return localStorage.getItem("userEmail");
};

// ============= Category API Functions =============

// Get all categories
export const getAllCategoriesAPI = async () => {
  try {
    const response = await axios.get(CATEGORY_API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get category by ID
export const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${CATEGORY_API_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create category (admin only)
export const createCategory = async (categoryData) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(CATEGORY_API_URL, categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update category (admin only)
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(`${CATEGORY_API_URL}/${categoryId}`, categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete category (admin only)
export const deleteCategoryAPI = async (categoryId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.delete(`${CATEGORY_API_URL}/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
