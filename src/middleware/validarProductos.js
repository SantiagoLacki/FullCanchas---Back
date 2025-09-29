import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarProducto = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio"),
  body("precio").notEmpty(),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarProducto;
