import { ISubmission } from "../interfaces/submission.interface";
import { api } from "./api.service";

export const submissionService = {
  submit: async (body: ISubmission, token: string) => {
    try {
      const response = await api.post("/submission/", {
        headers: { Authorization: `Bearer ${token}` },
        body,
      });
      return response.data;
    } catch (error) {
      throw new Error("Can't Submit.");
    }
  },
};
