import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { ReqUser } from "../middlewares/auth-middleware";

export const userDetailsController = {
  async getCoupons(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const coupons = await prisma.coupons.findMany({
        where: { user_id: req.user?.id },
      });

      return res.send({
        success: true,
        result: coupons,
      });
    } catch (error) {
      next(error);
    }
  },
};
