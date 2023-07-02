import { Router } from "express";
import express from "express";
import { userModel } from "../dao/models/users.model.js";

export const usersRouter = Router();

usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: true }));


usersRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send({ result: "success", payload: users });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send({ result: "error", error: "No se pudo obtener usuarios con Mongoose" });
  }
});

usersRouter.post("/", async (req, res) => {
  let { first_name, last_name, email } = req.body;
  if (!first_name || !last_name || !email) {
    console.error("Campos faltantes al crear usuario");
    res.status(400).send({
      status: "error",
      error: "No se puede crear un usuario con campos faltantes",
    });
    return;
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.error("Ya existe un usuario con este correo electrónico");
      res.status(400).send({
        status: "error",
        error: "Ya existe un usuario con este correo electrónico",
      });
      return;
    }

    let result = await userModel.create({ first_name, last_name, email });

    res.send({ status: "success", payload: result });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).send({
      status: "error",
      error: "No se pudo crear el usuario",
    });
  }
});

usersRouter.put("/:uid", async (req, res) => {
  let { uid } = req.params;
  let userToReplace = req.body;
  if (
    !userToReplace.first_name ||
    !userToReplace.last_name ||
    !userToReplace.email
  ) {
    console.error("Campos faltantes al actualizar usuario");
    res.status(400).send({
      status: "error",
      error: "No se puede actualizar con campos faltantes.",
    });
    return;
  }
  let result = await userModel.updateOne({ _id: uid }, userToReplace);
  res.send({ status: "success", payload: result });
});

usersRouter.delete("/:uid", async (req, res) => {
  let { uid } = req.params;
  let result = await userModel.deleteOne({ _id: uid });
  res.send({ status: "success", payload: result });
});
