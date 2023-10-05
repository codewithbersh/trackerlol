import { Prisma } from "@prisma/client";

export type ReceiptWithTransactionWithCategory = Prisma.ReceiptGetPayload<{
  include: { transaction: { include: { category: true } } };
}>;
