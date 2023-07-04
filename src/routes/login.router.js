import express from "express";
import { userModel } from "../dao/models/users.model.js";
import { createHash, isValidPassword  } from "../utils.js";


export const loginRouter = express.Router();

loginRouter.post('/register', async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;
  if (!first_name || !last_name || !age || !email || !password) {
    return res.status(400).render('error', { msg: 'faltan datos,por favor ingrese bien las cosas.' });
  }
  try {
    await userModel.create({ first_name, last_name, age, email, password: createHash(password), admin: false });
    req.session.firstName = first_name;
    req.session.email = email;
    req.session.admin = false;
    return res.redirect('/profile');
  } catch (e) {
    console.log(e);
    return res.status(400).render('error', { msg: 'controla tu email y intenta mas tarde' });
  }
});

loginRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render('error-page', { msg: 'faltan datos' });
    }
    const foundUser = await userModel.findOne({ email });
    if (foundUser && isValidPassword(password, foundUser.password) /* foundUser.password === password */) {
      req.session.firstName = foundUser.first_name;
      req.session.email = foundUser.email;
      req.session.admin = foundUser.admin;
      return res.redirect('/profile');
    } else {
      return res.status(401).render('error', { msg: 'email o pass incorrectos' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).render('error', { msg: 'error inesperado en servidor' });
  }
});