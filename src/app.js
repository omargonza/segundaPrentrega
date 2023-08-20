/*import express from "express";

import path from "path";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { ProductManager } from "./dao/services/productManager.js";
import { productManagerRouter } from "./routes/products.router.js";
import { ProductManagerMongo } from "./dao/services/productManagerMongo.js";
import  {viewsRouter}  from "./routes/views.router.js";
import { sessionsRouter } from './routes/sessions.router.js';
import  {usersRouter}  from "./routes/users.router.js";
import  {cartsRouter}  from "./routes/carts.router.js";
import { msgsRouter } from "./routes/messages.router.js";
import realTimeRouter from "./routes/realTimeProdRoutes.router.js";
import { loginRouter } from "./routes/login.router.js";

import { Server } from "socket.io";
import { MONGODB_URI } from "./config.js";
import  session  from "express-session";
import MongoStore from "connect-mongo";
import passport from 'passport';
import { iniPassport } from './config/passport.config.js';




const app = express();
const port = 8081;

const productManagerMongo = new ProductManagerMongo();

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
*/

//configurando el entorno
import { entorno } from "./config/env-config.js";
console.log(entorno);


//requiriendo y configurando express
import express from "express";
const app = express();
const PORT = entorno.PORT || 3000;


//session y cookies
//import cookieParser from "cookie-parser";
import session from "express-session";



//requiriendo y definiendo a mongoDB como base de datos del proyecto
import { connectMongo } from "./config/connections.js";
import MongoStore from "connect-mongo";
connectMongo();
//para guardar las session en la base de datos en mongodb, de forma que si se apaga el servidor, las session siguen existiendo - (el ttl: es el tiempo de duracion de la session)
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:entorno.mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 86400 * 2,
    }),
    secret: "un-re-secreto",
    resave: true,
    saveUninitialized: true,
  })
);

//importando dirname
import { sourceDirname } from "./utils/dirname.js";

//configurando el uso de passport
import passport from "passport";
import { iniPassport } from "./config/passport.config.js";

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

//para configurar archivos como publicos
app.use(express.static("public"));

//para configurar el motor de handlebars (las 4 lineas)
import handlebars from "express-handlebars";
app.engine("handlebars", handlebars.engine());
app.set("views", sourceDirname + "/views");
app.set("view engine", "handlebars");

//la siguiente linea es para poder usar mejor el req.query, extendiendo las opciones
app.use(express.urlencoded({ extended: true }));
//para configurar de que el servidor siempre responda devolviendo archivos en formato json
app.use(express.json());

//--------------------------------------------------------------------------------------------------
//importando las rutas de las apis
import { routerApiProducts } from "./routes/apis/products-routes.js";
import { routerApiCarts } from "./routes/apis/carts-routes.js";
import { routerApiSessions } from "./routes/apis/sessions-routes.js";
import {routerApiMockData} from "./routes/apis/mockdata/mockdata-router.js"
//endpoint tipo api (crudos en json)
app.use("/api/products", routerApiProducts);
app.use("/api/carts", routerApiCarts);
app.use("/api/sessions", routerApiSessions);
app.use("/api/mockingproducts", routerApiMockData);
//importando las rutas de los views

//importando las rutas de los views en realtime (servidor socket.io)
import { routerRealTimeProducts } from "./routes/realtimes/products-realtime-routes.js";
import { routerViewChat } from "./routes/realtimes/chat-view-router.js";

//endpoint de views en real time (servidor socket.io)
app.use("/realtimeproducts", routerRealTimeProducts);
app.use("/chatsocket", routerViewChat);

//importando las rutas de los views
import { routerProducts } from "./routes/products/products-routes.js";
import { routerCarts } from "./routes/carts/carts-routes.js";
import { routerUsers } from "./routes/users/users-routes.js";

//endpoint de views
app.use("/products", routerProducts);
app.use("/carts", routerCarts);
app.use("/users", routerUsers);

//cuando la ruta no existe
app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "Error", msg: "La ruta no existe", data: {} });
});
//--------------------------------------------------------------------------------------------------

//para confirgurar el servidor socket hay que importar el archivo donde se encuentra toda la logica del socket server, luego guardar el servidor http en una variable y por ultimo ejecurtar el "servidor" de socket.io sobre nuestro servidor http
import { connectSocket } from "./utils/socket-server.js";
const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
connectSocket(httpServer);

