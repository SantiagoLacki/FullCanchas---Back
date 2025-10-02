import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarReserva = [
  body("idUsuario")
    .notEmpty()
    .withMessage("El id del usuario es obligatorio")
    .isMongoId()
    .withMessage("El id del usuario no es válido"),
  body("idCancha")
    .notEmpty()
    .withMessage("El id de la cancha es obligatorio")
    .isMongoId()
    .withMessage("El id de la cancha no es válido"),
  body("dia")
    .notEmpty()
    .withMessage("El dias es obligatorio")
    .isISO8601()
    .withMessage("El día debe ser una fecha válida")
    .custom((value) => {
      const fecha = new Date(value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fecha < hoy) {
        throw new Error("El día no puede estar en el pasado");
      }
      return true;
    }),
  ,
  body("hora")
    .notEmpty()
    .withMessage("La hora es obligatoria")
    .matches(/^(?:0?[1-9]|1[0-2]):[0-5][0-9]\s?(?:[aApP](\.?)[mM]\1)?$/)
    .withMessage("Sistema horario de 12 horas hh:mm"),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarReserva;
