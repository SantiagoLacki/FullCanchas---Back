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
      const [year, month, day] = value.split("-").map(Number);
      const fecha = new Date(year, month - 1, day);
      const hoy = new Date();
      const hoyLocal = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        hoy.getDate()
      );
      if (fecha < hoyLocal) {
        throw new Error("El día no puede estar en el pasado");
      }

      return true;
    }),
  ,
  body("hora")
    .notEmpty()
    .withMessage("La hora es obligatoria")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("La hora debe tener el formato de 24 horas HH:mm")
    .custom((value, { req }) => {
      const [y, mo, d] = (req.body.dia || "").split("-").map(Number);
      if (!y || !mo || !d) return true; 
      const fechaReservaDia = new Date(y, mo - 1, d);
      const ahora = new Date();
      const mismoDia =
        fechaReservaDia.getFullYear() === ahora.getFullYear() &&
        fechaReservaDia.getMonth() === ahora.getMonth() &&
        fechaReservaDia.getDate() === ahora.getDate();

      if (mismoDia) {
        const [h, m] = value.split(":").map(Number);
       
        const horaReserva = new Date(y, mo - 1, d, h, m, 0, 0);

        if (horaReserva <= ahora) {
          throw new Error("La hora no puede estar en el pasado");
        }
      }
      return true;
    }),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarReserva;
