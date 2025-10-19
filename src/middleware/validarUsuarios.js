import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarUsuarios = [
  body("nombreUsuario")
    .notEmpty()
    .withMessage("El nombre del usuario es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre de usuario debe tener entre 2 y 50 caracteres")
    .matches(/^[\w]+$/)
    .withMessage(
      "El nombre de usuario solo puede contener letras, números y guiones bajos"
    )
    .trim(),
  ,
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe tener un formato válido")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8, max: 16 })
    .withMessage("La contraseña debe tener entre 8 y 16 caracteres")
    .matches(
      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
    )
    .withMessage(
      "La contraseña debe tener al monos una letra mayúscula, una letra minúscula, un número y un carácter especial"
    ),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarUsuarios;
