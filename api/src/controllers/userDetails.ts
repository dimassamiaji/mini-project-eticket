import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { $Enums, Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";

export const userDetailsController = {
  async getCoupons(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const coupons = await prisma.coupons.findMany({
        where: { user_id: req.user?.id, expired_at: { gte: new Date() } },
      });

      return res.send({
        success: true,
        result: coupons,
      });
    } catch (error) {
      next(error);
    }
  },
  async pointDeleter(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const checkExp = await prisma.users.findUnique({
        where: { id: req.user?.id },
      });
      if (checkExp?.expired_at) {
        if (checkExp?.expired_at < new Date()) {
          const pointDelete: Prisma.usersUpdateInput = {
            points: 0,
          };
          await prisma.users.update({
            data: pointDelete,
            where: { id: req.user?.id },
          });
        }
      }
      return res.send({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
};
