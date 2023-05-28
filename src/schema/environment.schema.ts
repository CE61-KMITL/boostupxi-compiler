import { z } from "zod";

export const environmentSchema = z.object({
  PORT: z.string().regex(/^\d+$/).default("4000").transform(Number),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  API_URL: z.string().nonempty(),
  JWT_SECRET: z.string().nonempty(),
  ALLOWED_ORIGINS: z.string().nonempty(),
});
