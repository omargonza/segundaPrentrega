import express from "express";
import { userModel } from "../dao/models/users.model.js";
import { createHash, isValidPassword  } from "../utils.js";


export const loginRouter = express.Router();

loginRouter.post('/register', async (req, res) => {
  const { first_name, last_name, age, email, role,  password } = req.body;
  
  if (!first_name || !last_name || !age || !email || !password || !role) {
    return res.status(400).render('error', { msg: 'Faltan datos, por favor ingrese todos los campos.' });
  }
  
  try {
    let admin = false;
    
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      admin = true;
    }
    
    const newUser = await userModel.create({ first_name, last_name, age, email, role, password: createHash(password), role: admin ? 'admin' : 'user' });
    
    req.session.first_name = first_name;
    req.session.email = email;
    req.session.admin = foundUser.role === 'admin';
    
    let welcomeMessage = admin ? 'Bienvenido, eres un administrador.' : 'Bienvenido, eres un usuario.';
    
    res.render('bienvenido', { message: welcomeMessage }); // Renderiza la vista 'bienvenido' con el mensaje de bienvenida
  } catch (e) {
    console.log(e);
    return res.status(400).render('error', { msg: 'Hubo un error al registrar el usuario, por favor inténtelo de nuevo más tarde.' });
  }
});

loginRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render('error', { msg: 'Faltan datos' });
    }
    const foundUser = await userModel.findOne({ email });
    if (foundUser && isValidPassword(password, foundUser.password)) {
      req.session.first_name = foundUser.first_name;
      req.session.email = foundUser.email;
      req.session.admin = foundUser.role;
      
      let welcomeMessage = foundUser.admin ? 'Bienvenido, eres un administrador.' : 'Bienvenido, eres un usuario.';
      
      res.render('bienvenido', { message: welcomeMessage }, () => {
        res.redirect('/profile');
      });
    } else {
      return res.status(401).render('error', { msg: 'Email o contraseña incorrectos' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).render('error', { msg: 'Error inesperado en el servidor' });
  }
});


// Ruta para obtener el usuario actual
loginRouter.get('/current', async (req, res) => {
  try {
    // Verifica si el usuario tiene una sesión activa
    if (!req.session.email) {
      return res.status(401).render('error', { msg: 'Usuario no autenticado' });
    }

    // Busca el usuario en la base de datos utilizando el correo electrónico almacenado en la sesión
    const foundUser = await userModel.findOne({ email: req.session.email });

    // Verifica si se encontró el usuario y si tiene un rol de administrador
    const admin = foundUser && foundUser.role === 'admin';

    // Devuelve una respuesta con los datos del usuario actual
    res.status(200).json({
      first_name: req.session.first_name,
      email: req.session.email,
      admin: admin,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).render('error', { msg: 'Error inesperado en el servidor' });
  }
});
