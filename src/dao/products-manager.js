import fs from "fs";
import path from "path";
import { __dirname } from "../utils/dirname.js";
import {
  verificationTypeOfProducts,
  verificationDataOfProducts,
} from "../middlewares/validations/products-validations.js";

class ProductManager {
  constructor() { 
    this.products = [];
    this.productsFilePath = path.resolve(
      __dirname,
      "../DAO/dataBase/products.json"
    );

    //comprobando si ya existe la base de datos o no existe
    if (!fs.existsSync(this.productsFilePath)) {
      fs.writeFileSync(this.productsFilePath, "");
    } else {
      //leyendo la base de datos
      let datos = fs.readFileSync(this.productsFilePath, "utf-8");
      //para devolver el string a su formato original
      const productsAObject = JSON.parse(datos);
      this.products = productsAObject;
    }
  }

  getProducts() {
    return this.products;
  }

  getProductsById(id) {
    const encontrado = this.products.find((elements) => elements.id == id);
    if (encontrado) {
      return encontrado;
    } else {
      throw new Error("The id: " + id + " was not found");
    }
  }

  #newId() {
    let maxId = this.products.reduce(
      (accomulador, producto) => Math.max(accomulador, producto.id),
      0
    );
    let newId = maxId + 1;
    return newId;
  }

  addProduct(dato) {
    let newProduct = {
      id: this.#newId(),
      title: dato.title,
      description: dato.description,
      category: dato.category,
      price: dato.price,
      thumbnail: dato.thumbnail || "without a picture",
      code: dato.code,
      stock: dato.stock,
      status: dato.status,
    };

    //probando las validaciones
    verificationTypeOfProducts(newProduct); 
    verificationDataOfProducts(newProduct);
    if (this.products.find((prod) => prod.code == newProduct.code)) {
      throw new Error(
        "The code: " +
          newProduct.code +
          " of the product title: " +
          newProduct.title +
          " already exist"
      );
    }
    //si pasa la validaciones --->
    console.log("Successful record of the product title: " + newProduct.title);
    this.products = [...this.products, newProduct];

    //En la linea justo de abajo, se utiliza para convertir los datos en formato de string, y se coloca el segundo parametro (null) y el tercer paremetro (numero de tabulaciones que se desea), para que el archivo json en la base de datos se vea de forma mas ordenado, estos dos parametros son opcionales.
    const productAString = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.productsFilePath, productAString);
  }

  updateProduct(id, prod) {
    let productToUpdate = this.getProductsById(id);
    let notUpdated = this.products.filter(function (elemento) {
      return elemento.id != id;
    });

    productToUpdate = {
      id: productToUpdate.id,
      title: prod.title || productToUpdate.title,
      description: prod.description || productToUpdate.description,
      category: prod.category || productToUpdate.category,
      price: prod.price || productToUpdate.price,
      thumbnail: prod.thumbnail || productToUpdate.thumbnail,
      code: prod.code || productToUpdate.code,
      stock: prod.stock || productToUpdate.stock,
      status: prod.status || productToUpdate.status,
    };

    //probando las validaciones
    verificationTypeOfProducts(productToUpdate);
    verificationDataOfProducts(productToUpdate);
    const exist = notUpdated.find(
      (elements) => elements.code === productToUpdate.code
    );
    if (exist) {
      throw new Error(
        "The code: " +
          productToUpdate.code +
          " of the product title: " +
          productToUpdate.title +
          " already exist"
      );
    } else {
      console.log(
        "Successful update of the product title: " + productToUpdate.title
      );
      this.products = [productToUpdate, ...notUpdated];
    }

    //En la linea justo de abajo, se utiliza para convertir los datos en formato de string, y se coloca el segundo parametro (null) y el tercer paremetro (numero de tabulaciones que se desea), para que el archivo json en la base de datos se vea de forma mas ordenado, estos dos parametros son opcionales.
    const productAString = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.productsFilePath, productAString);
  }

  deleteProduct(id) {
    let productToDelete = this.getProductsById(id);
    let notDeleted = this.products.filter(function (elemento) {
      return elemento.id != id;
    });

    if (productToDelete) {
      this.products = notDeleted
      //En la linea justo de abajo, se utiliza para convertir los datos en formato de string, y se coloca el segundo parametro (null) y el tercer paremetro (numero de tabulaciones que se desea), para que el archivo json en la base de datos se vea de forma mas ordenado, estos dos parametros son opcionales.
      const productAString = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.productsFilePath, productAString);
      return console.log("The id: " + id + " was deleted");
    } else {
      throw new Error("The id: " + id + " was not found");
    }
  }
}

export const productManager = new ProductManager();