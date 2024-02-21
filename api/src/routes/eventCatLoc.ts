/** @format */

import express, { Router } from "express";
import { eventController } from "../controllers/event";
import { eventCatLocController } from "../controllers/eventCatLoc";
export const route: Router = express.Router();
route.get("/categories", eventCatLocController.getCategories);
route.get("/locations", eventCatLocController.getLocations);
