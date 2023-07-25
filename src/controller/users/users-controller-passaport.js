//importando las funciones de la carpeta services
import { createHashPassword, checkPassword } from "../../utils/bcrypt.js";
import { userService } from "../../services/users/users-service.js";


export const userController = {
  register: async function (req, res) {
    try {
      return res.status(200).render("users-views/register-user", {
        title: "Registro de usuarios",
        style: "users/register.css",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "El usuario no fue creado con  exito",
        data: { error },
      });
    }
  },

  save: async function (req, res) {
    try {
      const infoOfBody = req.body;
      await userService.createNewUser(infoOfBody);
      return res.status(200).redirect("/users/login");
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "El usuario no fue creado con extito",
        data: { error },
      });
    }
  },

  login: async function (req, res) {
    try {
      return res.status(200).render("users-views/login-user", {
        title: "Ingreso al usuarios",
        style: "users/login.css",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "El usuario no pudo ser creado con exito",
        data: { error },
      });
    }
  },

  access: async function (req, res) {
    try {
    const infoOfBody = req.body;
    if (!infoOfBody.email || !infoOfBody.password) {
      return res.status(400).render("users-views/error-page", {
        status: "error",
        msg: "faltan completar datos",
        data: { error },
      });
    }
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      admin: req.user.admin,
    }

      return res.status(200).redirect("/products");
    } catch (error) {
      return res.status(400).render("users-views/error-page", {
        status: "error",
        msg: "El email o contraseña incorrecta",
        data: { error },
      });
    }
  },

  githubLogin: async function (req, res) {
    if (!req.user) {
      return res.status(400).render("users-views/error-page", {
        status: "error",
        msg: "faltan completar datos",
        data: { error },
      });
    }
    console.log(req.user);
    try {
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        admin: req.user.admin,
      }

      return res.status(200).redirect("/products");
    } catch (error) {
      return res.status(400).render("users-views/error-page", {
        status: "error",
        msg: "El email o contraseña incorrecta",
        data: { error },
      });
    }
  },

  logout: async function (req, res) {
    req.session.destroy((error) => {
      if (error) {
        return res.render("users-views/error-page", {
          msg: "No se pudo cerrar la session",
        });
      }
      return res.redirect("/users/login");
    });
  },

  error: async function (req, res) {
    try {
      return res.status(200).render("users-views/error-page", {
        title: "Error in the user module",
        msg: msg,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Error",
        msg: "Error in the register process",
        data: { error },
      });
    }
  },
};