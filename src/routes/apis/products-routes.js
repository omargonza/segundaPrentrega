import express from "express";
import { productsApiController } from "../../controller/apis/products-api-controller.js";
import {generateMockData} from "../../utils/faker.products.js"
export const routerApiProducts = express.Router();

//todos los productos
routerApiProducts.get("/", productsApiController.getAllProducts)
//un solo producto
routerApiProducts.get("/:id", productsApiController.showOneProduct)
//crear un producto
routerApiProducts.post("/", productsApiController.createOneProduct)
//modificar un profucto
routerApiProducts.put("/:id", productsApiController.updateOneProduct)
//eliminar un producto
routerApiProducts.delete("/:id", productsApiController.deleteOneProduct)
// datos simulados con faker
routerApiProducts.get("/mockingprodutcs",productsApiController.generateMockData)