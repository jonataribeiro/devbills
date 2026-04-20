import fastify from "fastify";
import AutoLoad from "@fastify/autoload";
import { join } from "path";

const app = fastify({
  logger: true,
});

app.register(AutoLoad, {
  dir: join(__dirname, "routes"),
  options: {
    prefix: "/api",
  },
});

export default app;




/*
import fastify from "fastify";
import categoryRoutes from "./routes/category.routes";
import transactionRoutes from "./routes/transaction.routes";

const app = fastify({
  logger: true,
});

app.register(categoryRoutes, { prefix: "/api/categories" });
app.register(transactionRoutes, { prefix: "/api/transactions" });

export default app;
*/

/*
import Fastify, { fastify } from "fastify";
import categoryRoutes from "./routes/category.routes";
import transactionRoutes from "./routes/transaction.routes";
import type { FastifyInstance } from "fastify";
import routes from "./routes";
import { env } from "./config/env";
*/
