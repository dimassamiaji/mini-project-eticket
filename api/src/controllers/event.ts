/** @format */

import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { $Enums, Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";
import fs from "fs";

export const eventController = {
  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const { event_name, category_id, location_id } = req.query;
      const category = {} as Prisma.categoriesWhereInput;
      const location = {} as Prisma.locationsWhereInput;
      const take = 8;
      const skip = (Number(req.params.id) - 1) * take;
      if (Number(category_id)) {
        category.id = Number(category_id);
      }
      if (Number(location_id)) {
        location.id = Number(location_id);
      }
      const event = {
        event_name: {
          contains: String(event_name),
        },
      } as Prisma.eventsWhereInput;
      const events = await prisma.events.findMany({
        skip,
        take,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
        where: {
          ...event,
          location: { ...location },
          category: { ...category },
          availability: { gt: 0 },
        },
      });
      const eventsAll = await prisma.events.findMany({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
        where: {
          ...event,
          location: { ...location },
          category: { ...category },
          availability: { gt: 0 },
        },
      });
      const pageCount = Math.ceil(eventsAll.length / take);
      res.send({
        success: true,
        result: events,
        pageCount,
      });
    } catch (error) {
      next(error);
    }
  },
  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await prisma.events.findUnique({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          promotion: true,
        },
        where: {
          id: Number(req.params.id),
        },
      });

      res.send({
        success: true,
        result: event,
      });
    } catch (error) {
      next(error);
    }
  },
  async editEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        event_name,
        price,
        description,
        start_date,
        end_date,
        availability,
        category_id,
        location_id,
        address,
      } = req.body;

      const location = await prisma.locations.findUnique({
        where: {
          id: Number(location_id),
        },
      });
      const category = await prisma.categories.findUnique({
        where: {
          id: Number(category_id),
        },
      });
      let price_type;
      if (price == 0) {
        price_type = $Enums.Price_type.free;
      } else {
        price_type = $Enums.Price_type.paid;
      }
      const editEvent: Prisma.eventsUpdateInput = {
        event_name,
        image_url: req.file?.filename,
        price: Number(price),
        description,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        availability: Number(availability),
        address,
        price_type,
        category: {
          connect: {
            id: category?.id,
          },
        },
        location: {
          connect: {
            id: location?.id,
          },
        },
      };
      await prisma.$transaction(async (prisma) => {
        const checkImage = await prisma.events.findUnique({
          where: {
            id: Number(req.params.id),
          },
        });
        const fs = require("fs");
        if (checkImage?.image_url && req.file?.filename) {
          fs.unlinkSync(
            __dirname +
              "/../public/images/event_images/" +
              checkImage?.image_url
          );
        }
        if (req.file) {
          editEvent.image_url = req.file.filename;
        }

        await prisma.events.update({
          data: editEvent,
          where: {
            id: Number(req.params.id),
          },
        });
      });
      res.send({
        success: true,
        message: "event edited",
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.$transaction(async (prisma) => {
        const checkImage = await prisma.events.findUnique({
          where: {
            id: Number(req.params.id),
          },
        });
        const checkPromo = await prisma.promotions.findUnique({
          where: {
            event_id: Number(req.params.id),
          },
        });
        const fs = require("fs");
        if (checkImage?.image_url) {
          fs.unlinkSync(
            __dirname +
              "/../public/images/event_images/" +
              checkImage?.image_url
          );
        }
        if (checkPromo) {
          await prisma.promotions.delete({
            where: {
              event_id: Number(req.params.id),
            },
          });
        }
        await prisma.events.delete({
          where: {
            id: Number(req.params.id),
          },
        });
      });
      res.send({
        success: true,
        message: "event deleted",
      });
    } catch (error) {
      next(error);
    }
  },
  async addEvent(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const {
        event_name,
        description,
        price,
        start_date,
        end_date,
        availability,
        category_id,
        location_id,
        address,
      } = req.body;
      const location = await prisma.locations.findUnique({
        where: {
          id: Number(location_id),
        },
      });
      const category = await prisma.categories.findUnique({
        where: {
          id: Number(category_id),
        },
      });
      let price_type;
      if (price == 0) {
        price_type = $Enums.Price_type.free;
      } else {
        price_type = $Enums.Price_type.paid;
      }
      const newEvent: Prisma.eventsCreateInput = {
        event_name,
        image_url: req.file?.filename,
        price: Number(price),
        description,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        availability: Number(availability),
        address,
        price_type,
        category: {
          connect: {
            id: category?.id,
          },
        },
        location: {
          connect: {
            id: location?.id,
          },
        },
        user: {
          connect: {
            id: req.user?.id,
          },
        },
      };

      await prisma.events.create({
        data: newEvent,
      });
      res.send({
        success: true,
        message: "event added",
      });
    } catch (error) {
      next(error);
    }
  },
};
