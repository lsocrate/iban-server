import { fastify } from "fastify";

import * as env from "./env.js";
import { apiRoutes } from "./routes/apiRoutes.js";

export const createServer = async () => {
  const server = fastify({ logger: env.nodeEnv !== "production" });
  server.register(apiRoutes, { prefix: "/api" });

  return {
    start: async (): Promise<void> => {
      await server.listen({ host: "0.0.0.0", port: env.port });
    },
    shutdown: async (): Promise<void> => {
      await server.close();
    },
  };
};
