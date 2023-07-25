

import passport from "passport";
import local from "passport-local";
import { createHashPassword, checkPassword } from "../utils/bcrypt.js";
import { userModel } from "../DAO/models/users.model.js";
import GitHubStrategy from "passport-github2";
import fetch from "node-fetch";

const LocalStrategy = local.Strategy;
export function iniPassport() {
  passport.use(
    "login",
    //en este modelo de passport, solo se trabaja con usuario y contraseña, es porque es que para adaptarlo a nuestro modelo, indicamos en la siguiente linea que el usernameField va a ser el email del esquima de nuestro modelo de usuarios.
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          
          if (!user) {
            console.log("The username: " + username + " was not found");
            return done(null, false);
          }
          if (!checkPassword(password, user.password)) {
            console.log("Invalid password, check and try again");
            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "register",
    //en este modelo de passport, solo se trabaja con usuario y contraseña, es porque es que para adaptarlo a nuestro modelo, indicamos en la siguiente linea que el usernameField va a ser el email del esquima de nuestro modelo de usuarios.
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const infoOfBody = req.body;
          let user = await userModel.findOne({ email: username });
          
          if (user) {
            console.log("The user already exist");
            return done(null, false);
          }

          let newUser = await userModel.create({
            first_name: infoOfBody.first_name,
            last_name: infoOfBody.last_name,
            age: infoOfBody.age,
            role: infoOfBody.role,
            email: infoOfBody.email,
            cartID: infoOfBody.cart,
            password: createHashPassword(password),
          });
          console.log("User registration succesful");
          return done(null, newUser);

        } catch (e) {
          console.log("Error in the register process");
          console.log(e);
          return done(e);
        }
      }
    )
  );
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (accesToken, _, profile, done) => {
        console.log(profile);
        try {
          console.log(profile);
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: "Bearer " + accesToken,
              "X-Github-Api-Version": "2022-11-28",
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error("cannot get a valid email for this user"));
          }
          profile.email = emailDetail.email;

          let user = await userModel.findOne({ email: profile.email });
          if (!user) {
            const newUser = {
              email: profile.email,
              first_name: profile._json.name || profile._json.login || "noname",
              last_name: "externalAuth",
              age:1,
              isAdmin: false,
              password: "nopass",
            };
            let userCreated = await userModel.create(newUser);
            console.log("Usuario registrado con exito");
            return done(null, userCreated);
          } else {
            console.log("El usuario ya existe");
            return done(null, user);
          }
        } catch (e) {
          console.log("Error en auth github");
          console.log(e);
          return done(e);
        }
      }
    )
  );
}

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  let user = await userModel.findById(id);
  done(null, user);
});