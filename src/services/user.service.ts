import axios from "axios";
import { api } from "./api.service";

export const userService = {
  profile: async (token: string) => {
    try {
      const response = await api.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Can't get user profile.");
    }
  },
};
