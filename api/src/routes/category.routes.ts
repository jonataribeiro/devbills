import { FastifyInstance } from "fastify";

export default async function categoryRoutes(app: FastifyInstance) {

  app.get("/categories", async () => {
    return { message: "Lista de categorias" };
  });

}