//importando las funciones de la carpeta services
import { userService } from "../../services/users/users-service.js";
import {createHashPassword, checkPassword} from "../../utils/bcrypt.js"

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
        msg: "the user could not be created",
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
        msg: "the user could not be created",
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
        msg: "the user could not be created",
        data: { error },
      });
    }
  },

  access: async function (req, res) {
    const infoOfBody = req.body;
    if (!infoOfBody.email || !infoOfBody.password) {
      return res.status(400).render("error-page", {
        status: "error",
        msg: "faltan completar datos",
        data: { error },
      });  
    }

    try {
      const userToEnter = await userService.findAUser(infoOfBody.email);

      if (userToEnter && checkPassword(infoOfBody.password, userToEnter.password)) {
        req.session.first_name = userToEnter.first_name;
        req.session.last_name = userToEnter.last_name;
        req.session.email = userToEnter.email;
        req.session.admin = userToEnter.admin;

        return res.status(200).redirect("/products");
      
      } else {
        return res.status(400).render("error-page", {
          status: "error",
          msg: "faltan completar datos",
          data: { error },
        });
      }
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
        return res.render('error-page', { msg: 'No se pudo cerrar la session' });
      }
      return res.redirect('/users/login');
    });
  }
  
};