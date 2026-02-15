import { MEETUPS_API_URL } from "./config";
import { getAuthToken } from "./storage";

export const getAllMeetups = async (params?: { my?: boolean }) => {
  try {
    const token = await getAuthToken();
    let url = MEETUPS_API_URL;
    if (params?.my) {
      url += "?my=true";
    }
    
    const response = await fetch(url, {
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch meetups: ${response.statusText}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const createMeetup = async (data: { 
  hostId: string, 
  hostName: string, 
  hostUsername: string, 
  type: string, 
  code: string, 
  title?: string,
  visibility?: 'public' | 'private'
}) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(MEETUPS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
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

export const updateMeetup = async (id: string, data: { title?: string, type?: string, status?: string }) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${MEETUPS_API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update meetup`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMeetup = async (id: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${MEETUPS_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to delete meetup`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const inviteCircleToMeetup = async (meetupId: string, circleId: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${MEETUPS_API_URL}/${meetupId}/invite-circle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ circleId }),
    });
    if (!response.ok) {
      throw new Error(`Failed to invite circle`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const inviteUserToMeetup = async (meetupId: string, username: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${MEETUPS_API_URL}/${meetupId}/invite-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ username }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to invite user");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getMeetup = async (id: string) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${MEETUPS_API_URL}/${id}`, {
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      }
    });
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("FORBIDDEN");
      }
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
    const token = await getAuthToken();
    const response = await fetch(`${MEETUPS_API_URL}/code/${code}`, {
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      }
    });
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
