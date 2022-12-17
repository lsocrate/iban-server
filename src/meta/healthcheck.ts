import { FastifyPluginAsync } from "fastify";

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/health",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              healthy: { type: "boolean" },
            },
          },
        },
      },
    },
    async (req, reply) => {
      reply.code(200).send({ healthy: true });
    }
  );
};
