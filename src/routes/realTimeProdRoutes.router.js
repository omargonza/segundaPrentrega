
import {Router} from "express"
import {ProductManager} from "../dao/services/productManager.js";


const dataProd = new ProductManager("productsDB");



export const realTimeRouter = Router();

realTimeRouter.get("/", async (req, res) => {
  try {

    const products = await dataProd.getProducts();

    return res.render("realTimeProducts", { products: products });

  } catch (error) {
    res.status(500).json({ succes: "false", msg: "Error", payload: {} });
  }
});

export default realTimeRouter