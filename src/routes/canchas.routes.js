import { Router } from "express";
import {
  borrarCancha,
  crearCancha,
  editarCancha,
  leerCanchas,
  leerCanchasID,
} from "../controllers/canchas.controllers.js";
import validarCanchas from "../middleware/validarCanchas.js";

const router = Router();

router.route("/").get(leerCanchas).post(validarCanchas, crearCancha);
router
  .route("/:id")
  .get(leerCanchasID)
  .delete(borrarCancha)
  .put(validarCanchas, editarCancha);

export default router;
