import passport from 'passport';
import express from 'express';


export const sessionsRouter = express.Router();

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  req.session.user = req.user;
  // Successful authentication, redirect home.
  res.redirect('/');
});

sessionsRouter.get('/show', (req, res) => {
  return res.send(JSON.stringify(req.session));
});



// Ruta para obtener la información del usuario actual
sessionsRouter.get('/current', (req, res) => {
  try {
    // Verifica si el usuario está autenticado
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    // Devuelve la información del usuario actual
    const user = req.user; 
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Error inesperado en el servidor' });
  }
});
