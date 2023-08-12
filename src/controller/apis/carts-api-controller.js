//@ts-check
//importando las funciones de la carpeta services
import { cartApiService } from "../../services/apis/carts-api-service.js";

export const cartsApiController = {
  getAllCarts: async function (/** @type {{ query: { limit: any; page: any; query: any; sort: any; }; }} */ req, /** @type {{ json: (arg0: { status: string; msg: string; data: any; }) => any; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: string; msg: string; data: { error: any; }; }): any; new (): any; }; }; }} */ res) {
    try {
      let { limit, page, query, sort } = req.query;
      const carts = await cartApiService.getCarts(limit, page, query, sort);

      return res.json({
        status: "Success",
        msg: "Mostrando todos los carritos de compra encontrados con exito",
        data: carts,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "something went wrong",
        data: { error },
      });
    }
  },

  showOneCart: async function (/** @type {{ params: { id_cart: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: string; msg: string; data: (import("mongoose").Document<unknown, {}, { products: any[]; }> & Omit<{ products: any[]; } & { _id: import("mongoose").Types.ObjectId; }, never>) | { error: any; } | null; }): any; new (): any; }; }; }} */ res) {
    try {
      const idCart = req.params.id_cart;
      const cart = await cartApiService.getOneCart(idCart);

      return res.status(200).json({
        status: "Success",
        msg: "Carrito de compras encontrado con exito",
        data: cart,
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        msg: "cart could not be found",
        data: { error },
      });
    }
  },

  createOneCart: async function (/** @type {any} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: string; msg: string; data: (import("mongoose").Document<unknown, {}, { products: any[]; }> & Omit<{ products: any[]; } & { _id: import("mongoose").Types.ObjectId; }, never>) | { error: any; }; }): any; new (): any; }; }; }} */ res) {
    try {
      await cartApiService.addCart();
      const carts = await cartApiService.getAllCarts();

      return res.status(201).json({
        status: "Success",
        msg: "Carrito de compras creado con exito",
        data: carts[carts.length - 1],
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        msg: "cart could not be created",
        data: { error },
      });
    }
  },

  addProductToACart: async function (/** @type {{ params: { id_cart: any; id_product: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: string; msg: string; data: (import("mongoose").Document<unknown, {}, { products: any[]; }> & Omit<{ products: any[]; } & { _id: import("mongoose").Types.ObjectId; }, never>) | { error: any; } | null; }): any; new (): any; }; }; }} */ res) {
    try {
      const idCart = req.params.id_cart;
      const idProduct = req.params.id_product;
      await cartApiService.addProductToCart(idCart, idProduct);

      let cartUpdated = await cartApiService.getOneCart(idCart);

      return res.status(201).json({
        status: "Success",
        msg: "Producto agregado al carrito de compras exitosamente",
        data: cartUpdated,
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        msg: "cart or the product could not be found",
        data: { error },
      });
    }
  },

  updateProductQuantity: async function (/** @type {{ params: { id_cart: any; id_product: any; }; body: { quantity: string; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: string; msg: string; data: (import("mongoose").Document<unknown, {}, { products: any[]; }> & Omit<{ products: any[]; } & { _id: import("mongoose").Types.ObjectId; }, never>) | { error: any; } | null; }): any; new (): any; }; }; }} */ res) {
    try {
      const idCart = req.params.id_cart;
      const idProduct = req.params.id_product;
      const quantity = parseInt(req.body.quantity)
      await cartApiService.updateProductQuantity(idCart, idProduct, quantity);

      let cartUpdated = await cartApiService.getOneCart(idCart);

      return res.status(201).json({
        status: "Success",
        msg: "Actualizado la cantidad de productos deseado en el carrito de compras",
        data: cartUpdated,
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        msg: "cart or the product could not be updated",
        data: { error },
      });
    }
  },

  removeProductFromCart: async function (/** @type {{ params: { id_cart: any; id_product: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: string; msg: string; data: (import("mongoose").Document<unknown, {}, { products: any[]; }> & Omit<{ products: any[]; } & { _id: import("mongoose").Types.ObjectId; }, never>) | { error: any; } | null; }): any; new (): any; }; }; }} */ res) {
    try {
      const idCart = req.params.id_cart;
      const idProduct = req.params.id_product;
      await cartApiService.removeProductFromCart(idCart, idProduct);

      let cartUpdated = await cartApiService.getOneCart(idCart);

      return res.status(201).json({
        status: "Success",
        msg: "Productos eliminado del carrito de compras",
        data: cartUpdated,
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        msg: "cart or the product could not be found",
        data: { error },
      });
    }
  },

  clearOneCart: async function (/** @type {{ params: { id_cart: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: string; msg: string; data: { cart: import("mongoose").Document<unknown, {}, { products: any[]; }> & Omit<{ products: any[]; } & { _id: import("mongoose").Types.ObjectId; }, never>; } | { error: any; }; }): any; new (): any; }; }; }} */ res) {
    try {
      const id = req.params.id_cart;
      const cart = await cartApiService.clearCart(id);

      return res.status(200).json({
        status: "Success",
        msg: "Se vacio el carrito de compras con el id " + id,
        data: { cart },
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        msg: "the cart could not be cleared",
        data: { error },
      });
    }
  },

  deleteOneCart: async function (/** @type {{ params: { id: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: string; msg: string; data: {} | { error: any; }; }): any; new (): any; }; }; }} */ res) {
    try {
      const id = req.params.id;
      await cartApiService.deleteCart(id);

      return res.status(200).json({
        status: "Success",
        msg: "Se elimino el carrito de compras con el id " + id,
        data: {},
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        msg: "the cart could not be deleted",
        data: { error },
      });
    }
  },


  purchaseCart: async function (/** @type {{ params: { cid: any; }; }} */ req, /** @type {any} */ res) {
    const cartId = req.params.cid;

    try {
      const result = await cartApiService.purchaseCart(cartId);
      return result;
    } catch (error) {
      throw new Error('Error al realizar la compra: ' + error.message);
    }
  }
};
