import express from "express";
import { cartsApiController } from "../../controller/apis/carts-api-controller.js";
import { cartApiService } from "../../services/apis/carts-api-service.js";

export const routerApiCarts = express.Router();

//todos los carritos de compra
routerApiCarts.get("/", cartsApiController.getAllCarts)
//un solo carrito de compra
routerApiCarts.get("/:id_cart", cartsApiController.showOneCart)
//crear un carrito de compras nuevo
routerApiCarts.post("/", cartsApiController.createOneCart)
//agregar un producto al carrito de compras
routerApiCarts.post("/:id_cart/product/:id_product", cartsApiController.addProductToACart)
//modifica la cantidad de un producto en el carrito de compras
routerApiCarts.put("/:id_cart/products/:id_product", cartsApiController.updateProductQuantity)
//elimina un producto del carrito de compras
routerApiCarts.delete("/:id_cart/products/:id_product", cartsApiController.removeProductFromCart)
//vaciar por completo un carrito de compras
routerApiCarts.delete("/:id_cart", cartsApiController.clearOneCart)
//eliminar un carrito de compras
routerApiCarts.delete("/:id", cartsApiController.deleteOneCart)
//La finalización del proceso de compra.
routerApiCarts.post("/:cid/purchase",cartApiService.purchaseCart)