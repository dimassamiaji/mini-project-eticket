import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { $Enums, Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";

export const promotionController = {
  async getPromo(req: Request, res: Response, next: NextFunction) {
    try {
      const { event_name } = req.query;
      const events = await prisma.events.findMany({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          promotion: {
            select: {
              isReferral: true,
              discount: true,
              description: true,
              start_date: true,
              end_date: true,
              limit: true,
            },
          },
        },
        where: {
          event_name: {
            contains: String(event_name),
          },
          NOT: {
            promotion: null,
          },
        },
      });

      res.send({
        success: true,
        result: events,
      });
    } catch (error) {
      next(error);
    }
  },
  async getPromoById(req: Request, res: Response, next: NextFunction) {
    try {
      const promo = await prisma.promotions.findUnique({
        where: {
          event_id: Number(req.params.id),
        },
      });

      res.send({
        success: true,
        result: promo,
      });
    } catch (error) {
      next(error);
    }
  },
  async editPromo(req: Request, res: Response, next: NextFunction) {
    try {
      const { isReferral, description, discount, limit, start_date, end_date } =
        req.body;
      const editPromo: Prisma.promotionsUpdateInput = {
        isReferral,
        description,
        discount,
        limit,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      };

      await prisma.promotions.update({
        data: editPromo,
        where: {
          event_id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "promo edited",
      });
    } catch (error) {
      next(error);
    }
  },
  async addPromo(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const {
        id,
        isReferral,
        description,
        discount,
        limit,
        start_date,
        end_date,
      } = req.body;
      const newPromo: Prisma.promotionsCreateInput = {
        event: {
          connect: {
            id,
          },
        },
        isReferral,
        description,
        discount,
        limit,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      };
      await prisma.promotions.create({
        data: newPromo,
      });
      res.send({
        success: true,
        message: "promo added",
      });
    } catch (error) {
      next(error);
    }
  },
  async deletePromo(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.promotions.delete({
        where: {
          event_id: Number(req.params.id),
        },
      });
      return res.send({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
};
