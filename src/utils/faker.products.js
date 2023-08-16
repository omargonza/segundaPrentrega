//para crear datos en la base de datos con faker
import {fakerES} from "@faker-js/faker"; 

import {productsModel } from "../DAO/models/products.model.js";



// Generar datos simulados y agregarlos a la base de datos
const generateMockData = async () => {
  try {
    for (let i = 0; i < 100; i++) {
      const fakeProduct = {
        title: fakerES.commerce.productName(),
        description: fakerES.lorem.sentences(),
        category: fakerES.commerce.department(),
        price: fakerES.commerce.price(),
        thumbnail: fakerES.image.string(),
        code: fakerES.random.number({min: 0, max:100}),
        stock: fakerES.random.number({ min: 0, max: 100 }),
      };
      
      await productsModel.create(fakeProduct);
    }
    console.log("Mock data generado con exito!");
  } catch (error) {
    console.error("Error al generar mock data:", error);
  }
};

export { generateMockData};


