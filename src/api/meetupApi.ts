import { MEETUPS_API_URL } from "./config";
import { getAuthToken } from "./storage";

export const getAllMeetups = async () => {
  try {
    const response = await fetch(MEETUPS_API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch meetups: ${response.statusText}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const createMeetup = async (data: { hostId: string, hostName: string, hostUsername: string, type: string, code: string, title?: string }) => {
  try {
    const response = await fetch(MEETUPS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to create meetup: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getMeetup = async (id: string) => {
  try {
    const response = await fetch(`${MEETUPS_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch meetup: ${response.statusText}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const joinMeetup = async (id: string, userId: string, name: string, username: string, vote: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${MEETUPS_API_URL}/${id}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ userId, name, username, vote }),
    });
    if (!response.ok) {
      throw new Error(`Failed to join meetup: ${response.statusText}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getMeetupByCode = async (code: string) => {
  try {
    const response = await fetch(`${MEETUPS_API_URL}/code/${code}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Meetup not found");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};
