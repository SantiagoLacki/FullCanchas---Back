import { Router } from "express";
import {
  borrarReserva,
  crearReservas,
  editarReserva,
  leerReservas,
  leerReservasPorID,
  reservasPaginadas,
} from "../controllers/reservas,controllers.js";
import verificarJWT from "../middleware/verificarJWT.js";
import validarReserva from "../middleware/validarReservas.js";

const router = Router();

router
  .route("/")
  .get(leerReservas)
  .post([verificarJWT, validarReserva], crearReservas);
router.route("/paginacion").get(reservasPaginadas);
router
  .route("/:id")
  .get(leerReservasPorID)
  .delete(verificarJWT, borrarReserva)
  .put([verificarJWT, validarReserva], editarReserva);

export default router;
