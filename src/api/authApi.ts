import { BASE_API_URL } from "./config";
import { getAuthToken } from "./storage";

export const signup = async (userData: any) => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Signup failed");
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials: any) => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const searchUsers = async (username: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${BASE_API_URL}/users/search?username=${username}`, {
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      }
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Search failed");
    }
    return result.data;
  } catch (error) {
      throw error;
  }
}
