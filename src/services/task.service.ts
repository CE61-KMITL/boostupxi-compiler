import { api } from "./api.service";

export const taskService = {
  getTestCases: async (taskId: string, token: string) => {
    try {
      const response = await api.get(`/tasks/${taskId}/testcases`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Can't get task.");
    }
  },
};
