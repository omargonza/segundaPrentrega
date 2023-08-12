import dotenv from "dotenv";

if (process.argv[2] != "DEV" && process.argv[2] != "PROD") {
  console.log("Se necesita especificar el entorno en que se va a trabajar");
  process.exit();
}

dotenv.config({
  path: process.argv[2] === "DEV" ? "./.env.development" : "./.env.production",
});

export const entorno = {
  modo: process.argv[2],
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URI,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  persistence: process.env.PERSISTENCIA_,
 // clientId: process.env.CLIENTID,
  //clientSecret: process.env.CLIENTSECRET,
  //callbackUrl: process.env.CALLBACKURL,
};