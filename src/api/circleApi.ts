import { BASE_URL } from "./config";
import { getAuthToken } from "./storage";

const CIRCLES_API_URL = `${BASE_URL}/circles`;

export const createCircle = async (name: string, memberUsernames: string[]) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(CIRCLES_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ name, memberUsernames }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create circle");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getMyCircles = async () => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${CIRCLES_API_URL}/my`, {
      method: "GET",
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch circles");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};
export const getCircle = async (id: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${CIRCLES_API_URL}/${id}`, {
      method: "GET",
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch circle details");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const updateCircle = async (id: string, name: string, memberUsernames: string[]) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${CIRCLES_API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ name, memberUsernames }),
    });

    if (!response.ok) {
      throw new Error("Failed to update circle");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCircle = async (id: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${CIRCLES_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete circle");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
