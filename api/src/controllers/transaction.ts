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
      return res.send({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
};
