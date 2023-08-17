//importando las funciones de la carpeta services
import { cartApiService } from "../../services/apis/carts-api-service.js";

export const cartController = {
  showOneCart: async function (req, res) {
    try {
      const id = req.params.id_cart;
      const cart = await cartApiService.getOneCart(id);
      const theCart = cart.products.map((prod) => prod.toJSON());

      return res.status(200).render("views/carts-views/carts-list", {
        title: "Detalle del carro",
        cart: theCart,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "something went wrongggg",
        data: { error },
      });
    }
  },
};