import { TransactionType } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import prisma from "../config/prisma";
import type { GetTransactionsSummaryQuery } from "../schemas/transaction.schema";
import type { CategorySummary } from "../types/category.types";
import type { TransactionSummary } from "../types/transaction.types";
import { FastifyReply, FastifyRequest } from "fastify";
dayjs.extend(utc);


export const getTransactionsSummary = async (
    request: FastifyRequest<{ Querystring: GetTransactionsSummaryQuery }>,
    reply: FastifyReply,
): Promise<void> => {

    const userId = 'FED$%DF%RDF';

  if (!userId) {
    reply.status(401).send({ error: 'Usuário não autenticado' });
    return;
  }

  const { month, year } = request.query;

  if (!month || !year ) {
    reply.status(400).send({ error: "Mês e Ano são obrogatórios" });
    return;
  }

    const startDate = dayjs.utc(`${year}-${month}-01`).startOf('month').toDate();
    const endDate = dayjs.utc(startDate).endOf('month').toDate();


    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            
            include: {
                category: true,
            },
        });

        let totalExpenses = 0;
        let totalIncomes = 0;
        const groupedExpenses = new Map<string, CategorySummary>();

        for(const transaction of transactions) {

            if (transaction.type === TransactionType.expense) {

                const existing = groupedExpenses.get(transaction.categoryId) ?? {
                    categoryId: transaction.categoryId,
                    categoryName: transaction.category.name,
                    categoryColor: transaction.category.color,
                    amount: 0,
                    percentage: 0,
                };

                existing.amount += transaction.amount;
                groupedExpenses.set(transaction.categoryId, existing);
                //groupedExpenses { alimentação : {somar todo mundo da categoria aliemntação}}

                totalExpenses += transaction.amount;         
            } else {
                totalIncomes += transaction.amount; 

            }
        }
        // console.log(Array.from(groupedExpenses.values()));
        // ALIMENTAÇÃO / { alimentaçao: }
        const summary: TransactionSummary = {
            totalExpenses,
            totalIncomes,
            balance: Number ((totalIncomes - totalExpenses).toFixed(2)),
            expensesByCategory: Array.from(groupedExpenses.values())
            .map((entry) => ({
                ...entry,
                percentage: Number.parseFloat(((entry.amount / totalExpenses) * 100).toFixed(2)),
            })),
            .sort( (a,b) => b.amount - a.amount),
        };

        reply.send(summary);    
    } catch (err) {
        request.log.error("Erro ao trazer transações", err);
        reply.status(500).send({ error: "Erro do servidor" });
    }

};