import { z } from "zod";

export const nodeEnv = z
  .enum(["production", "development", "test"])
  .parse(process.env.NODE_ENV);

export const port = z
  .preprocess(Number, z.number().int())
  .parse(process.env.PORT);
