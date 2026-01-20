import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarUsuarioModificado = [
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
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarUsuarioModificado;
