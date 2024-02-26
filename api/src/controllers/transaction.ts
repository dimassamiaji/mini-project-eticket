import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { $Enums, Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";
export const transactionController = {
  async getTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const transactions = await prisma.transactions.findMany();
      return res.send({
        success: true,
        result: transactions,
      });
    } catch (error) {
      next(error);
    }
  },
  async addTransaction(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { event_id, price } = req.body;
      const newTransaction: Prisma.transactionsCreateInput = {
        user: {
          connect: {
            id: req.user?.id,
          },
        },
        event: {
          connect: {
            id: event_id,
          },
        },
        price,
      };
      await prisma.transactions.create({
        data: newTransaction,
      });
      return res.send({
        success: true,
        message: "transaction added",
      });
    } catch (error) {
      next(error);
    }
  },
};
