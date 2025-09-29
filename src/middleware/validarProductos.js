import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Productos from "../models/productos.js";

const validarProducto = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres")
    .custom(async (valor, { req }) => {
      const productoExitente = await Productos.findOne({ nombre: valor });
      if (!productoExitente) return true;
      if (req.params?.id && productoExitente._id.toString() === req.params?.id)
        return true;
      throw new Error("Ya existe un producto con este nombre");
    }),
  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un valor numerico")
    .custom((valor) => {
      if (valor >= 0 && valor <= 100000) {
        return true;
      } else {
        throw new Error("El precio debe estar entre 0 y 100000");
      }
    }),
  body("imagen")
    .notEmpty()
    .withMessage("la imagen es obligatoria")
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|webp)/)
    .withMessage(
      "La imagen debe ser una URL valida y debe terminar en .jpg, .jpeg, .gif, .png o .webp"
    ),
  body("categoria")
    .notEmpty()
    .withMessage("Debes elegir una categoria")
    .isIn(["Remeras", "Bebidas", "Snacks", "Pelotas"])
    .withMessage(
      "La categoria debe ser una de las siguientes opciones: Remeras, Bebidas, Snacks, Pelotas"
    ),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripcion es obligatoria")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripcion debe tener entre 10 y 500 caracteres"),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarProducto;
