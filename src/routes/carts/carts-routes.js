import express from "express";
import { cartController } from "../../controller/carts/carts-controller.js";

export const routerCarts = express.Router();

//todos los productos
routerCarts.get("/:id_cart", cartController.showOneCart)