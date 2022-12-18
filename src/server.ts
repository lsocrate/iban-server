import { fastify } from "fastify";

import * as env from "./env.js";
import { ibanRoutes } from "./ibanModule/index.js";
import { healthRoutes } from "./meta/healthcheck.js";

export const createServer = async () => {
  const server = fastify({ logger: env.nodeEnv !== "production" });

  server.register(healthRoutes, { prefix: "/api" });
  server.register(ibanRoutes, { prefix: "/api" });

  return {
    start: async (): Promise<void> => {
      await server.listen({ host: "0.0.0.0", port: env.port });
    },
    shutdown: async (): Promise<void> => {
      await server.close();
    },
  };
};
