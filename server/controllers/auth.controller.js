const User = require("../models/auth.model");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
//const expressJWT = require('express-jwt');
const { errorHandler } = require("../helpers/dbErrorHandling");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(

);
////////////////////////////////////////////////////////
exports.neww = (req, res) => {
  const { name, email, password } = req.body;
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(

  );
  console.log(name, email, password);
  const msg = {
    to: "ricardomallqui6@gmail.com",
    from: "ricardomallqui6@gmail.com",
    subject: "we wqwq wqwq w",
    text: "weqwqwwewwwwwwwwwwwww",
  };

  sgMail.send(msg, function (err, info) {
    if (err) {
      console.log("error");
    } else {
      console.log("ok");
    }
  });

  res.json({
    success: true,
    message: "wwwwwwwwwwww route",
  });
};
///////////////////////////////////////

exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({
      email,
    }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          errors: "El email ya existe",
        });
      } else {
        const user = new User({
          name,
          email,
          password,
        });

        //Save user
        user.save((err, user) => {
          if (err) {
            console.log("Save error", errorHandler(err));
            // return res.status(401).json({
            //   errors: errorHandler(err),
            // });
          } else {
            return res.json({
              success: true,
              message: user,
              message: "Registro satisfactorio",
            });
          }
        });
      }
    });

    // const token = jwt.sign(
    //   {
    //     name,
    //     email,
    //     password,
    //   },
    //   process.env.JWT_ACCOUNT_ACTIVATION,
    //   {
    //     expiresIn: "5m",
    //   }
    // );

    // const emailData = {
    //   from: process.env.EMAIL_FROM,
    //   to: email,
    //   subject: "Account activation link",
    //   html: `
    //             <h1>Por favor use en siguiente link para activar su cuenta</h1>
    //             <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
    //             <hr />
    //             <p>This email may containe sensetive information</p>
    //             <p>${process.env.CLIENT_URL}</p>
    //         `,
    // };
    ////////////////////

    ////////////////////

    // sgMail
    //   .send(emailData)
    //   .then((sent) => {
    //     return res.json({
    //       message: `Email ha sido enviado a ${email} revice!!`,
    //     });
    //   })
    //   .catch((err) => {
    //     return res.status(400).json({
    //       success: false,
    //       errors: errorHandler(err),
    //       ff: `${process.env.EMAIL_FROM} -- ${email} y ${process.env.CLIENT_URL} y ${process.env.MAIL_KEY}`,
    //     });
    //   });
  }
};

exports.activationController = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        console.log("Activation error");
        return res.status(401).json({
          errors: "Link expirado. Regístrese otra vez",
        });
      } else {
        const { name, email, password } = jwt.decode(token);

        console.log(email);
        const user = new User({
          name,
          email,
          password,
        });

        //Save user
        user.save((err, user) => {
          if (err) {
            console.log("Save error", errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err),
            });
          } else {
            return res.json({
              success: true,
              message: user,
              message: "Registro satisfactorio",
            });
          }
        });
      }
    });
  } else {
    return res.json({
      message: "Error, por favor intente otra vez",
    });
  }
};

exports.signinController = async (req, res) => {
  console.log(req.params.email, req.params.password)
  const email = req.params.email
  const password = req.params.password
  const user = await User.findOne({ email });
  if (!user) //return res.status(401).send('The email doen\' exists');
    return res.json({
      user: { "msg": "El usuario no esta registrado" }
    });
  if (user.password !== password)// return res.status(401).send('Wrong Password');
    return res.json({
      user: { "msg": "Password incorrecto" }
    });
  return res.json( user );

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const firstError = errors.array().map((error) => error.msg)[0];
  //   return res.status(422).json({
  //     errors: firstError,
  //   });
  // } else {
  //   User.findOne({
  //     email,
  //   }).exec((err, user) => {
  //     if (err || !user) { return res.status(400).json({ errors: "Usuario con el email no existe", }); }
  //     if (user.password !== password) {
  //       return res.status(400).json({ errors: "Password incorrecto", });
  //     }
  //     const token = jwt.sign({ _id: user._id, }, process.env.JWT_SECRET, { expiresIn: "10m", })
  //     return res.json({ token, user })
  //   })
  // }
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET, // req.user._id
});

exports.adminMiddleware = (req, res, next) => {
  User.findById({
    _id: req.user._id,
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Usuario indefinido",
      });
    }

    if (user.role !== "admin") {
      return res.status(400).json({
        error: "Admin fuente. Acceso denegado.",
      });
    }

    req.profile = user;
    next();
  });
};

exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne(
      {
        email,
      },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "Usuario con el email no existe",
          });
        }

        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.JWT_RESET_PASSWORD,
          {
            expiresIn: "1",
          }
        );

        const emailData = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `Link reseteo de password`,
          html: `
                    <h1>Siga el siguente el link para resetear su password</h1>
                    <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                    <hr />
                    <p>Este email contiene información sencitiva</p>
                    <p>${process.env.CLIENT_URL}</p>
                `,
        };

        return user.updateOne(
          {
            resetPasswordLink: token,
          },
          (err, success) => {
            if (err) {
              console.log("RESET PASSWORD LINK ERROR", err);
              return res.status(400).json({
                error:
                  "Database connection error on user password forgot request",
              });
            } else {
              sgMail
                .send(emailData)
                .then((sent) => {
                  // console.log('SIGNUP EMAIL SENT', sent)
                  return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
                  });
                })
                .catch((err) => {
                  // console.log('SIGNUP EMAIL SENT ERROR', err)
                  return res.json({
                    message: err.message,
                  });
                });
            }
          }
        );
      }
    );
  }
};

exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(
        resetPasswordLink,
        process.env.JWT_RESET_PASSWORD,
        function (err, decoded) {
          if (err) {
            return res.status(400).json({
              error: "Link expirado. Intente otra vez",
            });
          }

          User.findOne(
            {
              resetPasswordLink,
            },
            (err, user) => {
              if (err || !user) {
                return res.status(400).json({
                  error: "Error. Intente mas tarde",
                });
              }

              const updatedFields = {
                password: newPassword,
                resetPasswordLink: "",
              };

              user = _.extend(user, updatedFields);

              user.save((err, result) => {
                if (err) {
                  return res.status(400).json({
                    error: "Error en el reseteo del password",
                  });
                }
                res.json({
                  message: `Grandioso! Ahora tu puedes ingresar con tu nuevo password`,
                });
              });
            }
          );
        }
      );
    }
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
// Google Login
exports.googleController = (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then((response) => {
      // console.log('GOOGLE LOGIN RESPONSE',response)
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role },
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
                return res.status(400).json({
                  error: "User signup failed with google",
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
              );
              const { _id, email, name, role } = data;
              return res.json({
                token,
                user: { _id, email, name, role },
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: "Google login failed. Try again",
        });
      }
    });
};

exports.facebookController = (req, res) => {
  console.log("FACEBOOK LOGIN REQ BODY", req.body);
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return (
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      // .then(response => console.log(response))
      .then((response) => {
        const { email, name } = response;
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role },
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log("ERROR FACEBOOK LOGIN ON USER SAVE", err);
                return res.status(400).json({
                  error: "Registro de usuario erroneo con facebook",
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
              );
              const { _id, email, name, role } = data;
              return res.json({
                token,
                user: { _id, email, name, role },
              });
            });
          }
        });
      })
      .catch((error) => {
        res.json({
          error: "Inicio erroneo con Facebook. Intente mas tarde",
        });
      })
  );
};
