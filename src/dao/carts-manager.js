import fs from "fs";
import path from "path";
import { __dirname } from "../utils/dirname.js";

class CartManager {
  constructor() {
    this.carts = [];
    this.cartsFilePath = path.resolve(__dirname, "../DAO/dataBase/carts.json");
    this.productsFilePath = path.resolve(
      __dirname,
      "../DAO/dataBase/products.json"
    );

    //comprobando si ya existe la base de datos o no existe
    if (!fs.existsSync(this.cartsFilePath)) { 
      fs.writeFileSync(this.cartsFilePath, "");
    } else {
      //leyendo la base de datos
      let cartsDatos = fs.readFileSync(this.cartsFilePath, "utf-8");
      //para devolver el string a su formato original
      const cartsAObject = JSON.parse(cartsDatos);
      this.carts = cartsAObject;
    }

    //importando la base de datos de los productos
    if (!fs.existsSync(this.productsFilePath)) {
      fs.writeFileSync(this.productsFilePath, [""]);
    } else {
      //leyendo la base de datos
      let productsDatos = fs.readFileSync(this.productsFilePath, "utf-8");
      //para devolver el string a su formato original
      const productsAObject = JSON.parse(productsDatos);
      this.products = productsAObject;
    }
  }

  getCarts() {
    return this.carts;
  }

  getCartsById(id) {
    const encontrado = this.carts.find((elements) => elements.idCart == id);
    if (encontrado) {
      return encontrado;
    } else {
      throw new Error("The id: " + id + " was not found");
    }
  }

  #newId() {
    let maxId = this.carts.reduce(
      (accomulador, carts) => Math.max(accomulador, carts.idCart),
      0
    );
    let newId = maxId + 1;
    return newId;
  }

  addCart() {
    let newCart = {
      idCart: this.#newId(),
      products: [],
    };

    this.carts = [...this.carts, newCart];

    //En la linea justo de abajo, se utiliza para convertir los datos en formato de string, y se coloca el segundo parametro (null) y el tercer paremetro (numero de tabulaciones que se desea), para que el archivo json en la base de datos se vea de forma mas ordenado, estos dos parametros son opcionales.
    const cartAString = JSON.stringify(this.carts, null, 2);
    fs.writeFileSync(this.cartsFilePath, cartAString);
  }

  addProductToCart(idCart, idProduct) {
    //se busca el indice del carrito
    const indexCart = this.carts.findIndex((cart) => cart.idCart == idCart);

    if (indexCart !== -1) {
      //si el carrito existe, se busca si ya existe el producto que se quiere agregar dentro del carrito
      const indexProduct = this.carts[indexCart].products.findIndex(
        (product) => product.idProduct == idProduct
      );

      if (indexProduct !== -1) {
        //como el producto ya existe en el carrito, le sumamos la cantidad
        this.carts[indexCart].products[indexProduct].quantity += 1;

        const cartAString = JSON.stringify(this.carts, null, 2);
        fs.writeFileSync(this.cartsFilePath, cartAString);
      } else {
        //si no existe el producto a agregar en el carrito, buscamos el producto en la base de datos
        const productToAdd = this.products.find(
          (product) => product.id == idProduct
        );
        
        //una vez el producto en una variable, lo agregamos al carrito
        if (productToAdd) {
          this.carts[indexCart].products.push({
            idProduct: productToAdd.id,
            nameOfTheProduct: productToAdd.title,
            quantity: 1,
          });

          const cartAString = JSON.stringify(this.carts, null, 2);
          fs.writeFileSync(this.cartsFilePath, cartAString);
        } else {
          throw new Error(
            //si el producto en realidad no existe
            "The id: " + idProduct + " of the product was not found"
          );
        }
      }
    } else {
      //si el carrito no existe
      throw new Error("The id: " + idCart + " of the cart was not found");
    }
  }
}

export const cartManager = new CartManager();