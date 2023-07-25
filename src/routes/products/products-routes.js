import express from "express";
import { productController } from "../../controller/products/products-controller.js";

export const routerProducts = express.Router();

//todos los productos
routerProducts.get("/", productController.getAllProducts)