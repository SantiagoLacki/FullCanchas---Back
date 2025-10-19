import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarCanchas = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
  body("tipoDeSuperficie")
    .notEmpty()
    .withMessage("Este el tipo de superficie es obligatio")
    .isIn(["Césped", "Césped artificial", "Tierra", "Pista dura"])
    .withMessage(
      "El tipo de superficie debe ser una de las siguientes opciones: Césped, Césped artificial, Tierra, Pista dura"
    ),
  body("precioPorHora")
    .notEmpty()
    .withMessage("Es obligatorio poner el precio por hora")
    .isNumeric()
    .withMessage("El precio debe ser un valor numerico")
    .custom((valor) => {
      if (valor >= 0 && valor <= 1000000) {
        return true;
      } else {
        throw new Error("El precio debe estar entre 0 y 1000000");
      }
    }),
  ,
  body("disponibilidad")
    .notEmpty()
    .withMessage("Este campo es obligatorio")
    .isIn(["true", "false"])
    .withMessage("Es obligatorio decidir si la card estara habilitada o no"),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarCanchas;
