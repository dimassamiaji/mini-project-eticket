import express, { Router } from "express";
import { userController } from "../controllers/user";
import { verifyUser } from "../middlewares/auth-middleware";
import { userDetailsController } from "../controllers/userDetails";

export const route: Router = express.Router();
route.get("/coupons", verifyUser, userDetailsController.getCoupons);
route.patch("/v1", verifyUser, userDetailsController.pointDeleter);
