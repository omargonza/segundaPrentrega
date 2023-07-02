import { Router } from "express";
import express from "express";
import { ProductManagerMongo } from "../dao/services/productManagerMongo.js";

export const productManagerRouter = Router();

const productManagerMongo = new ProductManagerMongo();

productManagerRouter.use(express.json());
productManagerRouter.use(express.urlencoded({ extended: true }));
/*
productManagerRouter.get("/", async (req, res) => {
  try {
    const allProducts = await productManagerMongo.getProducts();

    res.status(200).send({ status: "success", data: allProducts });
  } catch (error) {
    res.status(400).send({ status: "error", error: error.message });
  }
});

productManagerRouter.get("/:pid", async (req, res) => {
  try {
    let pid = req.params.pid;
    const findProduct = await productManagerMongo.getProductById(pid);
    res.status(200).send({ status: "success", data: findProduct });
  } catch (error) {
    res.status(400).send({ status: "error", data: error.message });
  }
});*/
productManagerRouter.get("/", async (req, res) => {
  try {
    // Obtener los parámetros de la consulta.
    const { limit = 10, page = 1, query = "", sort } = req.query;

    // Convertir los valores de limit y page a números enteros.
    const limitValue = parseInt(limit);
    const pageValue = parseInt(page);

    // Aplicar los filtros y paginación según los parámetros recibidos.
    const filteredProducts = await productManagerMongo.getProducts(query, sort, limitValue, pageValue);

    // Obtener el total de productos sin paginación.
    const totalProducts = await productManagerMongo.getProducts(query);

    // Calcular el número total de páginas.
    const totalPages = Math.ceil(totalProducts.length / limitValue);

    // Calcular los indicadores de páginas previas y siguientes.
    const hasPrevPage = pageValue > 1;
    const hasNextPage = pageValue < totalPages;

    // Calcular los números de página previa y siguiente.
    const prevPage = hasPrevPage ? pageValue - 1 : null;
    const nextPage = hasNextPage ? pageValue + 1 : null;

    // Los enlaces a las páginas previa y siguiente.
    const prevLink = hasPrevPage ? `/products?limit=${limitValue}&page=${prevPage}&query=${query}&sort=${sort}` : null;
    const nextLink = hasNextPage ? `/products?limit=${limitValue}&page=${nextPage}&query=${query}&sort=${sort}` : null;

    // Devolver la respuesta con el formato especificado
    res.status(200).send({
      status: "success",
      payload: filteredProducts,
      totalPages,
      prevPage,
      nextPage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
    });
  } catch (error) {
    res.status(400).send({ status: "error", error: error.message });
  }
});


productManagerRouter.put("/:pid", async (req, res) => {
  let updateProductClient = req.body;
  let pid = req.params.pid;
  try {
    const updateProduct = await productManagerMongo.updateProduct(
      pid,
      updateProductClient
    );
    res.status(200).send({ status: "success", data: updateProduct });
  } catch (error) {
    res.status(400).send({ status: "error", data: error.message });
  }
});

productManagerRouter.post("/", async (req, res) => {
  let newProduct = req.body;
  try {
    const addProduct = await productManagerMongo.addProduct(newProduct);
    res.status(201).send({ status: "success", data: addProduct });
  } catch (error) {
    res.status(400).send({
      status: "error",
      data: error.message,
    });
  }
});

productManagerRouter.delete("/:pid", async (req, res) => {
  let pid = req.params.pid;
  console.log(pid);

  try {
    const deleteProduct = await productManagerMongo.deleteProduct(pid);
    res.status(200).send({
      status: "success",
      data: "El producto eliminado es:" + deleteProduct,
    });
  } catch (error) {
    res.status(400).send({ status: "error", data: error.message });
  }
});
