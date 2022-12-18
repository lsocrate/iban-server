import type { FastifyPluginAsyncJsonSchemaToTs } from "@fastify/type-provider-json-schema-to-ts";
import { parseIban } from "./parser.js";

export const ibanRoutes: FastifyPluginAsyncJsonSchemaToTs = async (fastify) => {
  fastify.register(getIban);
};

const getIban: FastifyPluginAsyncJsonSchemaToTs = async (fastify) => {
  const schema = {
    params: {
      type: "object",
      required: ["iban"],
      properties: {
        iban: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        required: ["isValid"],
        properties: {
          isValid: { type: "boolean" },
        },
      },
    },
  } as const;

  fastify.get("/iban/:iban", { schema }, async (req, reply) => {
    const parsed = parseIban(req.params.iban);
    return { isValid: parsed.success };
  });
};
