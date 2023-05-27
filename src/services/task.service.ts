import { api } from "./api.service";

export const taskService = {
  get: async (token: string) => {
    try {
      const response = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Can't get task.");
    }
  },
};
