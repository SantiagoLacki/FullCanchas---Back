import { Router } from "express";
import {
  borrarCancha,
  crearCancha,
  editarCancha,
  leerCanchas,
  leerCanchasID,
} from "../controllers/canchas.controllers.js";
import validarCanchas from "../middleware/validarCanchas.js";
import verificarJWT from "../middleware/verificarJWT.js";

const router = Router();

router
  .route("/")
  .get(leerCanchas)
  .post([verificarJWT, validarCanchas], crearCancha);
router
  .route("/:id")
  .get(leerCanchasID)
  .delete(verificarJWT, borrarCancha)
  .put([verificarJWT, validarCanchas], editarCancha);

export default router;
