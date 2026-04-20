import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";

import createTransaction from "../controllers/transactions/createTransaction.controller";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/getTransactionsSummary.controller";

import {
  createTransactionSchema,
  deleteTransactionSchema,
  getTransactionsSchema,
  getTransactionsSummarySchema,
} from "../schemas/transaction.schema";

export default async function transactionRoutes(fastify: FastifyInstance) {

  // CRIAR TRANSAÇÃO
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransaction,
  });

  // BUSCAR TRANSAÇÕES
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSchema),
    },
    handler: getTransactions,
  });

  // BUSCAR RESUMO
  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSummarySchema),
    },
    handler: getTransactionsSummary,
  });

  // DELETAR
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: zodToJsonSchema(deleteTransactionSchema),
    },
    handler: deleteTransaction,
  });

};

//export default transactionRoutes;