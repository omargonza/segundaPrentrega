import express from "express";
import { productController } from "../../controller/products/products-controller.js";
import {generateMockData} from "../../utils/faker.products.js"


export const routerProducts = express.Router();

//todos los productos
routerProducts.get("/", productController.getAllProducts)
routerProducts.get('/mockingproducts',async(req, res)=>{
    let products = []
    for(let i=0; i<100; i++) {
        products.push(generateMockData())

    }
    res.send({status:"success", payload: products})
})