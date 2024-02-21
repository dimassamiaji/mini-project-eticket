/** @format */
import { Response, Request, NextFunction } from "express";

import express, { Router } from "express";
import { userController } from "../controllers/user";
import { verifyUser } from "../middlewares/auth-middleware";
export const route: Router = express.Router();
route.get("/", userController.login);

route.get("/v1", userController.keepLogin);
route.get("/v2", userController.sendMail);
route.patch("/v3", verifyUser, userController.verifyEmail);

route.post("/", userController.register);
route.patch("/v4", verifyUser, userController.forgotPassword);
