
import express from "express";
import { Router } from "express";
import { ProductManagerMongo } from "../dao/services/productManagerMongo.js";
import { CartManagerMongo } from "../dao/services/cartsManagerMongo.js";
import { productsModel } from "../dao/models/products.model.js";
import { checkAdmin, checkUser } from "../middlewares/auth.js";

const productManagerMongo = new ProductManagerMongo();
const cartManagerMongo = new CartManagerMongo();

export const viewsRouter = Router();

viewsRouter.use(express.json());
viewsRouter.use(express.urlencoded({ extended: true }));


viewsRouter.get("/products", async (req, res) => {
  try {
    const allProducts = await productManagerMongo.getProducts(req.query);

    let sessionDataName = req.session.first_name;
    let sessionAuth = req.session.admin;
    if (sessionAuth) {
      sessionAuth = "Admin";
    } else {
      sessionAuth = "Users";
    }

    if (allProducts && allProducts.docs && Array.isArray(allProducts.docs)) {
      res.status(200).render("products", {
        style: "../css/styles.css",
        p: allProducts.docs.map((products) => ({
          name: products.title,
          description: products.description,
          price: products.price,
          _id: products._id,
        })),
        pagingCounter: allProducts.pagingCounter,
        page: allProducts.page,
        totalPages: allProducts.totalPages,
        hasPrevPage: allProducts.hasPrevPage,
        hasNextPage: allProducts.hasNextPage,
        prevPage: allProducts.prevPage,
        nextPage: allProducts.nextPage,
        session: {
          sessionAuth: sessionAuth,
          sessionDataName: sessionDataName,
        },
      });
    } else {
      res.status(200).render("products", {
        style: "../css/styles.css",
        p: [], // Si no hay productos, se enviará un array vacío
        pagingCounter: 0,
        page: 1,
        totalPages: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
        session: {
          sessionAuth: sessionAuth,
          sessionDataName: sessionDataName,
        },
      });
    }
  } catch (error) {
    console.error("Error:", error);
    // Manejar el error apropiadamente (p. ej. renderizar una página de error)
    res.status(500).send("Error occurred while fetching products.");
  }
});

/*
viewsRouter.get("/products", async (req, res) => {
  const allProducts = await productManagerMongo.getProducts(req.query);

  let sessionDataName = req.session.first_name;
  let sessionAuth = req.session.admin;
  if (sessionAuth) {
    sessionAuth = "Admin";
  } else {
    sessionAuth = "Users";
  }

  res.status(200).render("products", {
    style: "../css/styles.css",
    p: allProducts.docs.map((products) => ({
      name: products.title,
      description: products.description,
      price: products.price,
      _id: products._id,
    })),
    pagingCounter: allProducts.pagingCounter,
    page: allProducts.page,
    totalPages: allProducts.totalPages,
    hasPrevPage: allProducts.hasPrevPage,
    hasNextPage: allProducts.hasNextPage,
    prevPage: allProducts.prevPage,
    nextPage: allProducts.nextPage,
    session: {
      sessionAuth: sessionAuth,
      sessionDataName: sessionDataName,
    },
  });
});
*/
viewsRouter.get("/productDetail/:pid", async (req, res) => {
  let pId = req.params.pid;
  const product = await productManagerMongo.getProductById(pId);

  console.log(product);

  res.status(200).render("productDetail", {
    style: "../css/styles.css",
    p: {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    },
  });
});

viewsRouter.get("/carts/:cid", async (req, res) => {
  let cId = req.params.cid;
  const cart = await cartManagerMongo.getCartId(cId);
  const totalPrice = cart.products.reduce(
    (acc, product) => acc + product.quantity * product.product.price,
    0
  );

  res.status(200).render("cartDetail", {
    style: "styles.css",
    p: cart.products.map((product) => ({
      name: product.product.name,
      price: product.product.price,
      quantity: product.quantity,
    })),
    totalPrice,
  });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

viewsRouter.get("/chat", async (req, res) => {
  res.render("chat", {});
});

viewsRouter.get("/login", async (req, res) => {
  res.render("login");
});

viewsRouter.get("/register", async (req, res) => {
  res.render("register");
});

viewsRouter.get("/profile", checkUser, async (req, res) => {
  console.log(req.session);
  res.render('profile', { data: JSON.stringify(req.session) });;
});
;


viewsRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render('error', { msg: 'no se pudo cerrar la session' });
    }
    return res.redirect('/login');
  });
});



viewsRouter.get('/solo-para-admin', checkAdmin, (req, res) => {
  res.send('ESTO SOLO LO PUEDE VER EL ADMIN');
});

viewsRouter.get('/', (req, res) => {
  res.render('login');
});
export default viewsRouter;

////////////////////////////////



