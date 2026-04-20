
import type { FastifyInstance } from 'fastify';
import categoryRoutes from './category.routes';
import transactionRoutes from './transaction.routes';

async function routes(fastify: FastifyInstance): Promise<void> {

    fastify.get('/health', async () => {
        return {
            status: 'OK',
            message: 'DevBills API está funcionando!',
        };
    });

    fastify.register(categoryRoutes, { prefix: 'api/categories' });
    fastify.register(transactionRoutes, { prefix: 'api/transactions'});
}


export default routes;



    /*
    fastify.post('/categories', async (request, reply) => {
        const { name, color, type } = request.body as {
            name: string;
            color: string;
            type: 'expense' | 'income';
        };

        const category = await fastify.prisma.category.create({
            data: {
                name,
                color,
                type,
            },
        });

        return reply.status(201).send(category);
    });

}

export default routes;
*/