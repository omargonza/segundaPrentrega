import { Router } from "express";
import express from "express";
import { CartManagerMongo } from "../dao/services/cartsManagerMongo.js";

export const cartsRouter = Router();

const cartsManagerMongo = new CartManagerMongo();

cartsRouter.use(express.json());
cartsRouter.use(express.urlencoded({ extended: true }));

cartsRouter.post("/", async (req, res) => {
  try {
    const userCart = await cartsManagerMongo.createCart();
    res.status(201).send({ status: "success", data: userCart });
  } catch (error) {
    res.status(400).send({ status: "error", error: "Cart not created" });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    const cartId = await cartsManagerMongo.getCartId(cid);
    res.status(200).send({ status: "success", data: cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const cartId = await cartsManagerMongo.addProductToCart(cid, pid);

    res.status(200).send({ status: "success", data: cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});
//el endpoint DELETE /api/carts/:cid/products/:pid para eliminar un producto del carrito.
cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    await cartsManagerMongo.removeProductFromCart(cid, pid);
    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

//el endpoint PUT /api/carts/:cid para actualizar el carrito con un arreglo de productos.
cartsRouter.put("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const products = req.body.products;
    await cartsManagerMongo.updateCart(cid, products);
    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

// el endpoint PUT /api/carts/:cid/products/:pid para actualizar la cantidad de un producto en el carrito.
cartsRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    await cartsManagerMongo.updateProductQuantity(cid, pid, quantity);
    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

//el endpoint DELETE /api/carts/:cid para eliminar todos los productos del carrito.
cartsRouter.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    await cartsManagerMongo.removeAllProductsFromCart(cid);
    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

//la ruta /:cid para que al traer todos los productos se incluyan los datos completos mediante populate.
cartsRouter.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const populatedCart = await cartsManagerMongo.getPopulatedCart(cid);
    res.status(200).send({ status: "success", data: populatedCart });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

//La ruta /:cid para visualizar los productos que pertenecen a dicho carrito.
cartsRouter.get("/:cid", async (req, res) => {
  try {
  const cid = req.params.cid;
  const products = await cartsManagerMongo.getProductsByCart(cid);
  res.status(200).send({status: "success",});
  res.render("carts", { products });
  } catch (error) {
  res.status(404).send({status: "error", error: error.message});
    }
});
  
  
    
  
   
