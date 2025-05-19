const {
    check
} = require('express-validator');
exports.validSign = [
  check("name", "Nombre es requerido")
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("El nombre debe contener entre 3 to 32 caracteres"),
  check("email").isEmail().withMessage("Debe ser un email aceptable"),
  check("password", "El password es necesario").notEmpty(),
//   check("password")
//     .isLength({
//       min: 3,
//     })
//     .withMessage("El password debe contener 3 caracteres minímo")
//     .matches(/\d/)
//     .withMessage("El password debe contener un número"),
];

exports.validLogin = [
  check("email").isEmail().withMessage("Debe ser un email aceptable"),
  check("password", "password es requerido").notEmpty(),
//   check("password")
//     .isLength({
//       min: 3,
//     })
//     .withMessage("El password debe contener 3 caracteres minímo")
//     .matches(/\d/)
//     .withMessage("El password debe contener un número"),
];


exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Formato de email no aceptado')
];

exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage("El password debe contener 3 caracteres minímo"),
];