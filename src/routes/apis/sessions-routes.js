import express from "express";
import { sessionsApiController } from "../../controller/apis/sessions-api-controller.js";

export const routerApiSessions = express.Router();

//muestra la session actual
routerApiSessions.get("/current", sessionsApiController.show)
