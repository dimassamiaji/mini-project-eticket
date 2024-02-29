import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { $Enums, Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";
export const transactionController = {
  async getTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { invoice_no } = req.query;
      const transaction = {
        invoice_no: {
          contains: String(invoice_no),
        },
      } as Prisma.transactionsWhereInput;
      const transactions = await prisma.transactions.findMany({
        include: {
          user: {
            select: {
              email: true,
            },
          },
          event: { select: { event_name: true } },
        },
        where: { ...transaction },
      });
      return res.send({
        success: true,
        result: transactions,
      });
    } catch (error) {
      next(error);
    }
  },
  async getTransactionUser(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { invoice_no } = req.query;
      const transaction = {
        invoice_no: {
          contains: String(invoice_no),
        },
      } as Prisma.transactionsWhereInput;
      const transactions = await prisma.transactions.findMany({
        include: {
          event: { select: { event_name: true } },
        },
        where: { ...transaction, user_id: req.user?.id },
      });
      return res.send({
        success: true,
        result: transactions,
      });
    } catch (error) {
      next(error);
    }
  },
  async editReview(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { invoice_no, rating, review } = req.body;
      const editReview: Prisma.transactionsUpdateInput = {
        rating,
        review,
      };
      await prisma.transactions.update({
        data: editReview,
        where: { invoice_no },
      });
      return res.send({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
  async addTransaction(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { event_id, point, coupon_id, availability } = req.body;
      let { price } = req.body;
      const checkUser = await prisma.transactions.findMany({
        where: {
          user: {
            id: req.user?.id,
          },
          event: {
            id: event_id,
          },
        },
      });
      if (checkUser.length > 0) throw Error("you already purchased this item");
      await prisma.$transaction(async (prisma) => {
        const checkPromo = await prisma.promotions.findUnique({
          where: {
            event_id,
            end_date: { gte: new Date() },
            limit: { gte: 0 },
          },
        });
        if (checkPromo) {
          price = Number(price) - Number((price * checkPromo.discount) / 100);
          const limitDecrease: Prisma.promotionsUpdateInput = {
            limit: checkPromo.limit - 1,
          };
          await prisma.promotions.update({
            data: limitDecrease,
            where: { event_id: checkPromo.event_id },
          });
        }
        if (coupon_id) {
          const coupon = await prisma.coupons.findUnique({
            where: { id: Number(coupon_id) },
          });

          price = price - Number((price * Number(coupon?.amount)) / 100);
          await prisma.coupons.delete({
            where: { id: Number(coupon_id) },
          });
        }
        if (point) {
          if (Number(req.user?.points) < point)
            throw Error("insufficient points");
          price = price - Number(point);
          if (price < 0)
            throw Error("points spent cannot be higher than the final price");
          const pointDecrease: Prisma.usersUpdateInput = {
            points: Number(req.user?.points) - Number(point),
          };
          await prisma.users.update({
            data: pointDecrease,
            where: {
              id: req.user?.id,
            },
          });
        }
        if (Number(req.user?.wallet) < price) {
          throw Error("insufficient wallet balance");
        }
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
        const walletDecrease: Prisma.usersUpdateInput = {
          wallet: Number(req.user?.wallet) - price,
        };
        const availabilityDecrease: Prisma.eventsUpdateInput = {
          availability: availability - 1,
        };
        await prisma.users.update({
          data: walletDecrease,
          where: { id: req.user?.id },
        });
        await prisma.events.update({
          data: availabilityDecrease,
          where: { id: event_id },
        });
      });
      return res.send({
        success: true,
        message: "transaction success",
      });
    } catch (error) {
      next(error);
    }
  },
};
