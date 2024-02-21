/** @format */

import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";
import fs from "fs";

export const eventController = {
  async getEvents(req: Request, res: Response, next: NextFunction) {
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
        },
        where: {
          event_name: {
            contains: String(event_name),
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
        price_type,
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
      const editEvent: Prisma.eventsUpdateInput = {
        event_name,
        image_url: req.file?.filename,
        price,
        description,
        start_date,
        end_date,
        availability,
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

      if (req.file) {
        editEvent.image_url = req.file.filename;
      }

      await prisma.events.update({
        data: editEvent,
        where: {
          id: Number(req.params.id),
        },
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
        const fs = require("fs");
        fs.unlinkSync(
          __dirname + "/../public/images/event_images/" + checkImage?.image_url
        );

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
        price_type,
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
