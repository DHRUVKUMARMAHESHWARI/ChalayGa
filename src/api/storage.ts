import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'userToken';
const PROFILE_KEY = 'userProfile';

export const storeAuthData = async (token: string, profile: any) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Error storing auth data:', error);
  }
};

export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const getUserProfile = async () => {
  try {
    const profile = await AsyncStorage.getItem(PROFILE_KEY);
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(PROFILE_KEY);
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};
