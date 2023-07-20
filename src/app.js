import express from "express";

import path from "path";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { ProductManager } from "./dao/services/productManager.js";
import { productManagerRouter } from "./routes/products.router.js";
import { ProductManagerMongo } from "./dao/services/productManagerMongo.js";
//import { msgsManagerMongo } from "./dao/services/msgsManager.js";
//import { MsgModel } from "./dao/models/msgs.model.js";
import {indexRouter  } from "./routes/index.router.js"
import  {viewsRouter}  from "./routes/views.router.js";
import { sessionsRouter } from './routes/sessions.router.js';
import  {usersRouter}  from "./routes/users.router.js";
import  {cartsRouter}  from "./routes/carts.router.js";
import { msgsRouter } from "./routes/messages.router.js";
import realTimeRouter from "./routes/realTimeProdRoutes.router.js";
import { loginRouter } from "./routes/login.router.js";
//import { viewsRouter } from "./routes/views.router.js";
import { Server } from "socket.io";
import { MONGODB_URI } from "./config.js";
import  session  from "express-session";
import MongoStore from "connect-mongo";
import passport from 'passport';
import { iniPassport } from './config/passport.config.js';
//import {connectToDatabase} from "./utils.js";


//import * as dotenv from "dotenv"
//dotenv.config();


const app = express();
const port = 8081;

const productManagerMongo = new ProductManagerMongo();
//const msgsManagerMongo = new msgsManagerMongo();
//connectToDatabase();

app.use (express.json());
app.use(express.urlencoded({ extended: true }));


const httpServer = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

const socketServer = new Server(httpServer);


app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
       MONGODB_URI,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
  })
);

//TODO LO DE PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());
//FIN TODO LO DE PASSPORT


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");




socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  const products = await productManagerMongo.getProducts();
  socket.emit("products", products);

  const msgs = await MsgModel.find({});
  socketServer.sockets.emit("all_msgs", msgs);

  socket.on("formSubmission", async (data) => {
    await productManagerMongo.addProduct(data);
    const products = await productManagerMongo.getProducts();
    socketServer.sockets.emit("products", products);
  });

  socket.on("msg_front_to_back", async (msg) => {
    const msgCreated = await MsgModel.create(msg);
    const msgs = await MsgModel.find({});
    socketServer.sockets.emit("all_msgs", msgs);
  });
});
app.use('/', indexRouter);
app.use('/api/sessions', sessionsRouter);
app.use("/",viewsRouter);
app.use("/api/sessions", loginRouter);
app.use("/api/products", productManagerRouter);
app.use("/api/users", usersRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", msgsRouter);
app.use("/products",viewsRouter);
app.use("/realtimeproducts", realTimeRouter);
app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});
/*

import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { ProductManagerMongo } from "./dao/services/productManagerMongo.js";
import { MsgModel } from "./dao/models/msgs.model.js";
import { cartsRouter } from "./routes/carts.router.js";
import { viewsRouter } from "./routes/views.router.js";
import { productManagerRouter } from "./routes/products.router.js";
import { usersRouter } from "./routes/users.router.js";

const app = express();
const port = 8082;

app.use(express.urlencoded({ extended: true }));


app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use(express.static("public"));

const productManagerMongo = new ProductManagerMongo();

const httpServer = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

app.use("/", viewsRouter);

socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  const products = await productManagerMongo.getProducts();
  socket.emit("products", products);

  const msgs = await MsgModel.find({});
  socketServer.sockets.emit("all_msgs", msgs);

  socket.on("formSubmission", async (data) => {
    await productManagerMongo.addProduct(data);
    const products = await productManagerMongo.getProducts();
    socketServer.sockets.emit("products", products);
  });

  socket.on("msg_front_to_back", async (msg) => {
    const msgCreated = await MsgModel.create(msg);
    const msgs = await MsgModel.find({});
    socketServer.sockets.emit("all_msgs", msgs);
  });
});

app.use("/api/products", productManagerRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});*/
