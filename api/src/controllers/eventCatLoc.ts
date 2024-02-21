import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";

export const eventCatLocController = {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await prisma.categories.findMany();
      return res.send({
        success: true,
        result: categories,
      });
    } catch (error) {
      next(error);
    }
  },
  async getLocations(req: Request, res: Response, next: NextFunction) {
    try {
      const locations = await prisma.locations.findMany();
      return res.send({
        success: true,
        result: locations,
      });
    } catch (error) {
      next(error);
    }
  },
};
