import { BASE_URL } from "./config";
import { getAuthToken } from "./storage";

export const searchUsers = async (query: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${BASE_URL}/users/search?username=${query}`, {
      method: "GET",
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to search users");
    }

    const result = await response.json();
    return result.data; // The backend returns { success: true, data: [...] }
  } catch (error) {
    throw error;
  }
};

export const savePushToken = async (pushToken: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${BASE_URL}/users/push-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ expoPushToken: pushToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to save push token");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
