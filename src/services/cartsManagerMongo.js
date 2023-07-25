import { cartsModel } from "../models/carts.model.js";
import { ProductManagerMongo } from "./productManagerMongo.js";

const productManagerMongo = new ProductManagerMongo();

export class CartManagerMongo {
  constructor() {}

  createCart() {
    return new Promise((resolve, reject) => {
      cartsModel
        .create({ products: [] })
        .then((cart) => {
          resolve(cart);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  getCartId(id) {
    return new Promise((resolve, reject) => {
      cartsModel
        .findById(id)
        .then((cart) => {
          resolve(cart);
        })
        .catch((error) => {
          reject(new Error("Cart not found"));
        });
    });
  }

  async addProductToCart(cId, pId) {
    try {
      const productToAdd = await productManagerMongo.getProductById(pId);

      if (!productToAdd) {
        throw new Error("Product not found");
      }

      let cart = await cartsModel.findOneAndUpdate(
        { _id: cId, "products.pId": productToAdd._id },
        {
          $inc: { "products.$.quantity": 1 },
        }
      );

      if (!cart) {
        cart = await cartsModel.findByIdAndUpdate(cId, {
          $push: { products: { pId: productToAdd._id, quantity: 1 } },
        });
      }

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  removeProductFromCart(cId, pId) {
    return new Promise((resolve, reject) => {
      cartsModel
        .findByIdAndUpdate(
          cId,
          { $pull: { products: { pId } } },
          { new: true }
        )
        .then((cart) => {
          if (!cart) {
            reject(new Error("Cart not found"));
          } else {
            resolve(cart);
          }
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  updateCart(cId, products) {
    return new Promise((resolve, reject) => {
      cartsModel
        .findByIdAndUpdate(cId, { products }, { new: true })
        .then((cart) => {
          if (!cart) {
            reject(new Error("Cart not found"));
          } else {
            resolve(cart);
          }
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  updateProductQuantity(cId, pId, quantity) {
    return new Promise((resolve, reject) => {
      cartsModel
        .findOneAndUpdate(
          { _id: cId, "products.pId": pId },
          { $set: { "products.$.quantity": quantity } },
          { new: true }
        )
        .then((cart) => {
          if (!cart) {
            reject(new Error("Cart not found"));
          } else {
            resolve(cart);
          }
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  removeAllProductsFromCart(cId) {
    return new Promise((resolve, reject) => {
      cartsModel
        .findByIdAndUpdate(cId, { products: [] }, { new: true })
        .then((cart) => {
          if (!cart) {
            reject(new Error("Cart not found"));
          } else {
            resolve(cart);
          }
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  getPopulatedCart(cId) {
    return new Promise((resolve, reject) => {
      cartsModel
        .findById(cId)
        .populate("products.pId")
        .exec((error, cart) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(cart);
          }
        });
    });
  }
}





/*
const productManagerMongo = new ProductManagerMongo();

export class CartManagerMongo {
  constructor() {}

  createCart() {
    return new Promise((resolve, reject) => {
      cartsModel
        .create({ products: [] })
        .then((cart) => {
          resolve(cart);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  getCartId(id) {
    return new Promise((resolve, reject) => {
      cartsModel
        .findById(id)
        .then((cart) => {
          resolve(cart);
        })
        .catch((error) => {
          reject(new Error("Cart not found"));
        });
    });
  }

  async addProductToCart(cId, pId) {
    try {
      const productToAdd = await productManagerMongo.getProductById(pId);
      console.log(productToAdd);

      if (!productToAdd) {
        throw new Error("Product not found");
      }

      let cart = await cartsModel.findOneAndUpdate(
        { _id: cId, "products.pId": productToAdd._id },
        {
          $inc: { "products.$.quantity": 1 },
        }
      );

      if (!cart) {
        cart = await cartsModel.findByIdAndUpdate(cId, {
          $push: { products: { pId: productToAdd._id, quantity: 1 } },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}*/
