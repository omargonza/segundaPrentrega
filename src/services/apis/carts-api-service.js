//importando las funciones de la clase product manager
import { cartsModel } from "../../DAO/models/carts.model.js";
import { productsModel } from "../../DAO/models/products.model.js";

class CartApiService {
  async getCarts(limit, page, query, sort) {
    const filter = query ? { title: { $regex: query, $options: "i" } } : {};
    const sortOption = sort == "asc" ? { price: 1 } : { price: -1 };

    const options = {
      limit: limit || 5,
      page: page || 1,
      sort: sortOption,
    };

    const carts = await cartsModel.paginate(filter, options);
    return carts;
  }

  async getAllCarts() {
    const carts = await cartsModel.find({});
    return carts;
  }

  async getOneCart(idCart) {
    const cart = await cartsModel.findOne({ _id: idCart }).populate("products.product");
    return cart;
  }

  async addCart() {
    const newCart = await cartsModel.create({});
    return newCart;
  }

  async addProductToCart(idCart, idProduct) {
    // Buscar el carrito en la base de datos
    const cart = await cartsModel.findOne({ _id: idCart });

    if (cart) {
      // Verificar si el producto ya existe en el carrito
      const product = cart.products.find(
        (product) => product.product.toString() === idProduct
      );
      if (product) {
        // El producto ya existe en el carrito, incrementar la cantidad
        product.quantity += 1;
      } else {
        // El producto no existe en el carrito, buscarlo en la base de datos de productos
        const productToAdd = await productsModel.findById(idProduct);

        if (productToAdd) {
          // Agregar el producto al carrito
          cart.products.push({
            product: productToAdd._id,
            quantity: 1,
          });
        }
      }
      // Guardar los cambios en el carrito en la base de datos
      await cart.save();
    }
  }

  async updateProductQuantity(idCart, idProduct, quantity) {
    // Buscar el carrito en la base de datos
    const cart = await cartsModel.findOne({ _id: idCart });
  
    if (cart) {
      // Buscar el producto en el carrito
      const product = cart.products.find(
        (product) => product.product.toString() === idProduct
      );
        if (product) {
        // Actualizar la cantidad del producto en el carrito
        product.quantity = quantity;
      }
        // Guardar los cambios en el carrito en la base de datos
      await cart.save();
    }
  }
  
  async removeProductFromCart(idCart, idProduct) {
    // Buscar el carrito en la base de datos
    const cart = await cartsModel.findOne({ _id: idCart });

    if (cart) {
      // Verificar si el producto existe en el carrito
      const productIndex = cart.products.findIndex(
        (product) => product.product.toString() === idProduct
      );
      if (productIndex !== -1) {
        // El producto existe en el carrito, eliminarlo
        cart.products.splice(productIndex, 1);
      }
      // Guardar los cambios en el carrito en la base de datos
      await cart.save();
    }
  }

  async clearCart(idCart) {
    let cart = await cartsModel.findOne({ _id: idCart });
    cart.products = [];
    cart = await cart.save();
    return cart;
  }

  async deleteCart(_id) {
    const deleted = await cartsModel.deleteOne({ _id: _id });
    return deleted;
  }
}

export const cartApiService = new CartApiService();