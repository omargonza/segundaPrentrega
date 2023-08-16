//@ts-check
//importando las funciones de la carpeta services
import { productApiService } from "../../services/apis/products-api-service.js";
import {generateMockData} from "../../utils/faker.products.js"

export const productsApiController = {
  getAllProducts: async function (req, res) {
    try {
      let { limit, page, query, sort } = req.query;
      const products = await productApiService.getProducts(
        limit,
        page,
        query,
        sort
      );

      return res.status(200).json({
        status: "Success",
        msg: "Mostrando todos los productos encontrados con exito",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "something went wrong",
        data: { error },
      });
    }
  },

  showOneProduct: async function (req, res) {
    try {
      const id = req.params.id;
      const product = await productApiService.getOneProduct(id);

      return res.status(200).json({
        status: "Success",
        msg: "Producto encontrado con exito",
        data: product,
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        msg: "product could not be found",
        data: { error },
      });
    }
  },

  createOneProduct: async function (req, res) {
    try {
      const newInfo = req.body;
      await productApiService.addProduct(newInfo);
      const products = await productApiService.getAllProducts();

      return res.status(201).json({
        status: "Success",
        msg: "Producto creado con exito",
        data: products[products.length - 1],
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        msg: "product could not be created",
        data: { error },
      });
    }
  },

  updateOneProduct: async function (req, res) {
    try {
      const id = req.params.id;
      const dataToUpdate = req.body;
      await productApiService.updateProduct(id, dataToUpdate);

      const products = await productApiService.getAllProducts();
      const index = products.findIndex((p) => p.id == id);

      return res.status(201).json({
        status: "Success",
        msg: "Se pudo actualizar exitosamente el producto con el id " + id,
        data: products[index],
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        msg: "product could not be updated",
        data: { error },
      });
    }
  },

  deleteOneProduct: async function (req, res) {
    try {
      const id = req.params.id;
      await productApiService.deleteProduct(id);

      return res.status(200).json({
        status: "Success",
        msg: "Se elimino el producto con el id " + id,
        data: {},
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        msg: "product could not be deleted",
        data: { error },
      });
    }
  },

  generateMockData: async function (req, res) {

    try {
      await productApiService.generateMockData;

      return res.status(200).json({
        
      status:"Success",
      msg: "Mock data generado con exito",

      data:[],
      });
    }


catch (error){
  return res.status(500).json({
    status:"Error",
    msg: "Erro al generar MOck data",
    data: {error},
  });
}
  }

  
};