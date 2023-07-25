import express from "express";
import { productRealtimeController } from "../../controller/realtime/products-realtime-controller.js";

export const routerRealTimeProducts = express.Router();

//ver todos los productos
routerRealTimeProducts.get("/", productRealtimeController.index)