import { TransactionType } from "@prisma/client";
import { CategorySummary } from "./category.types";



export interface TransactionFilter {
    userId: string;
    date?: {
        gte: Date;
        lte: Date;
    };
    type?: TransactionType;
    categoryId?: string;
}

export interface TransactionSummary {
    totalExpenses: number;
    totalIncomes: number;
    balance: number;
    expensesByCategory: CategorySummary[];
}

// gte Greater Than or Equal > maior ou igual
// lte Less Than or Equal Menor ou igual