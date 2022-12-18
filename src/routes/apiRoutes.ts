import type { FastifyPluginAsync } from "fastify";

import { ibanRoutes } from "./iban/routes.js";
import { healthRoutes } from "./health/routes.js";

export const apiRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(healthRoutes, { prefix: "/health" });
  fastify.register(ibanRoutes, { prefix: "/iban" });
};
