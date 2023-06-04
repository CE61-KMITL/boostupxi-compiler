import { CorsOptions } from "cors";
import { environment } from "./environment";

const allowedOrigins = environment.ALLOWED_ORIGINS?.split(",") || [];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin as string) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
