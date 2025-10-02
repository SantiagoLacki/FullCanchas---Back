import { Router } from "express";
import {
  borrarReserva,
  crearReservas,
  editarReserva,
  leerReservas,
  leerReservasPorID,
} from "../controllers/reservas,controllers.js";
import verificarJWT from "../middleware/verificarJWT.js";

const router = Router();

router.route("/").get(leerReservas).post(verificarJWT, crearReservas);
router
  .route("/:d")
  .get(leerReservasPorID)
  .delete(verificarJWT, borrarReserva)
  .put(verificarJWT, editarReserva);

export default router;
