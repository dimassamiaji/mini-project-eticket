/** @format */

import express, { Router } from "express";
import { eventController } from "../controllers/event";
import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
import { fileUploader } from "../middlewares/multer";
import { promotionController } from "../controllers/promotion";
export const route: Router = express.Router();
route.get("/", promotionController.getPromo);
route.get("/:id", promotionController.getPromoById);
route.patch("/:id", verifyUser, verifyAdmin, promotionController.editPromo);
route.post("/", verifyUser, verifyAdmin, promotionController.addPromo);
route.delete("/:id", verifyUser, verifyAdmin, eventController.deleteEvent);
