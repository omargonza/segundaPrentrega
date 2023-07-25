//importando las funciones de la carpeta services
import { productApiService } from "../../services/apis/products-api-service.js";

export const productController = {
  getAllProducts: async function (req, res) {
    let user = {}
    if (req.session && req.session.user) {
      user = req.session.user;
    }else{
      user = {}
    }

    try {
      let { limit, page, query, sort } = req.query;
      const allProducts = await productApiService.getProducts(
        limit,
        page,
        query,
        sort
      );

      return res.status(200).render("products-views/products-list", {
        title: "Lista de productos",
        user: user,
        products: allProducts.docs.map((product) => ({
          id: product._id.toString(),
          title: product.title,
          description: product.description,
          category: product.category,
          price: product.price,
          stock: product.stock,
        })),
        pagingCounter: allProducts.pagingCounter,
        page: allProducts.page,
        totalPages: allProducts.totalPages,
        hasPrevPage: allProducts.hasPrevPage,
        hasNextPage: allProducts.hasNextPage,
        prevPage: allProducts.prevPage,
        nextPage: allProducts.nextPage,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "something went wrong",
        data: { error },
      });
    }
  },
};