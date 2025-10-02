import { Router } from "express";
import {
  borrarReserva,
  crearReservas,
  editarReserva,
  leerReservas,
  leerReservasPorID,
} from "../controllers/reservas,controllers.js";
import verificarJWT from "../middleware/verificarJWT.js";
import validarReserva from "../middleware/validarReservas.js";

const router = Router();

router
  .route("/")
  .get(leerReservas)
  .post([verificarJWT, validarReserva], crearReservas);
router
  .route("/:d")
  .get(leerReservasPorID)
  .delete(verificarJWT, borrarReserva)
  .put([verificarJWT, validarReserva], editarReserva);

export default router;
