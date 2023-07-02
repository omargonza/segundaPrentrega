import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default __dirname;


//conexion mongoose
import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

try {
  const db = await mongoose.connect(MONGODB_URI);
  console.log("🆗 Conectados a MongoDB, Ecommerce!", db.connection.name);
} catch (error) {
  console.error(error);
}

mongoose.connection.on("Conectado con exito!", () => {
  console.log("Mongoose conectado");
});

mongoose.connection.on("Desconectado", () => {
  console.log("Mongoose descoectado");
});

//-----------------------bcrypto-------------------
import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);