import express from "express";
import{generateMockData} from "../../../utils/faker.products.js"


export const routerApiMockData =express.Router();

routerApiMockData.get('/mockingproducts', async (req, res) => {
    const products = []
    for(let i = 0; i < 100; i++) {
        products.push(generateMockData())
    }
    res.send({status:"Success", payload: products})
});

export default routerApiMockData;