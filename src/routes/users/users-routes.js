import express from "express";
import passport from 'passport';
import { userController } from "../../controller/users/users-controller-passaport.js";


export const routerUsers = express.Router();

//para registrar un nuevo usuario
routerUsers.get("/register", userController.register)
routerUsers.post("/register/create", passport.authenticate('register', { failureRedirect: '/users/auth/error' }), userController.save)

//para ingresar el usuario
routerUsers.get("/login", userController.login)
routerUsers.post("/login/into", passport.authenticate('login', { failureRedirect: '/users/auth/error' }), userController.access)

//para el ingreso de un usuario a traves de github
routerUsers.get("/github", passport.authenticate('github', { scope: ['user:email'] }))
routerUsers.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/users/auth/error' }), userController.githubLogin)

//para desloguearse y eliminar la session
routerUsers.get("/logout", userController.logout)

//ruta dcuando hay un problema
routerUsers.get("/auth/error", userController.error)
