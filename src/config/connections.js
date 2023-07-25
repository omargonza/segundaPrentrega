
//@ts-check
import { connect } from "mongoose";
import { entorno } from "./env-config.js";

//import faker from "faker";
import { productsModel } from "../DAO/models/products.model.js";

    /* //para crear base de datos de productos falsos con faker
    (async () => {
      const products = [];
      for (let i = 0; i < 100; i++) {
        products.push({
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          category: faker.commerce.department(),
          price: faker.commerce.price(),
          thumbnail: faker.image.imageUrl(),
          code: faker.random.alphaNumeric(8),
          stock: faker.random.number({ min: 0, max: 100 }),
          status: faker.random.boolean(),
        });
      }
      try {
        await ProductModel.insertMany(products);
        console.log("Inserted", products.length, "products");
      } catch (error) {
        console.error("Error en insert many:", error);
      }
    })(); */


    export async function connectMongo(connectionUrl) {
      try {
         connectionUrl = entorno.mongoUrl;
       
    
        await connect(connectionUrl), 
    
        console.log("Connected to MongoDB!");
      } catch (e) {
        console.error(e);
        throw new Error("Cannot connect to the database");
      }
    }
    
       
