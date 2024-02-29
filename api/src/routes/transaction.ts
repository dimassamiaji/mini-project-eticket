import { transactionController } from "../controllers/transaction";
import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
import express, { Router } from "express";

export const route: Router = express.Router();
route.get("/", verifyUser, verifyAdmin, transactionController.getTransaction);
route.get("/users", verifyUser, transactionController.getTransactionUser);
route.patch("/users", verifyUser, transactionController.editReview);
route.post("/", verifyUser, transactionController.addTransaction);
