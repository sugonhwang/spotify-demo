import { User } from "../models/user";
import api from "../utils/api";

export const getCurrentUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get(`/me`, {});
    return response.data;
  } catch {
    throw new Error("fail fetch to user profile");
  }
};
